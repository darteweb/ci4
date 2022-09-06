<?php

namespace Modules\UserModule\Controllers;

use App\Controllers\BaseController;
use Modules\UserModule\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class AdminController extends BaseController
{
    use ResponseTrait;

    public function __construct()
    {
        if (!isset($_POST['is_api']) && empty($_POST['is_api'])) {
            if (session()->get('isLoggedIn') != "1") {
                echo 'Access denied';
                exit;
            }
        }
    }

    public function index()
    {
        return view("\Modules\UserModule\Views\admin\dashboard");
    }

    public function userList($data = '')
    {
        $model = new UserModel();

        if (!isset($_POST['is_api']) && empty($_POST['is_api'])) {
            if (empty($data)) {
                $data = array();
            }
        } else {
            $data = array();
            $data = $_POST;
        }

        // if user not master admin then get only child users 
        $user_role = session()->get('role_id');
        if ($user_role != '1') {
            $data['parent_id'] = session()->get('id');
        }

        $where = array();

        if (isset($data['country']) && !empty($data['country'])) {
            $where['country'] = $data['country'];
        }
        if (isset($data['region']) && !empty($data['region'])) {
            $where['region'] = $data['region'];
        }
        if (isset($data['parent_id']) && !empty($data['parent_id'])) {
            $where['parent_id'] = $data['parent_id'];
        }
        if (isset($data['role_id']) && !empty($data['role_id'])) {
            $where['role_id'] = $data['role_id'];
        }
        if (isset($data['mobile']) && !empty($data['mobile'])) {
            $where['mobile'] = $data['mobile'];
        }
        if (isset($data['email']) && !empty($data['email'])) {
            $where['email'] = $data['email'];
        }
        if (isset($data['name']) && !empty($data['name'])) {
            $where['name'] = $data['name'];
        }

        $user_list = $model->where($where)->orderBy('id', 'desc')->findAll();

        $responce  = array();
        foreach ($user_list as $k => $user) {
            $responce[$k]['id']         = $user['id'];
            $responce[$k]['name']       = $user['name'];
            $responce[$k]['email']      = $user['email'];
            $responce[$k]['mobile']     = $user['mobile'];
            $responce[$k]['user_name']  = $user['user_name'];
            $responce[$k]['role_id']    = $user['role_id'];
            $responce[$k]['parent_id']  = $user['parent_id'];
            $responce[$k]['country']    = $user['country'];
            $responce[$k]['region']     = $user['region'];
            $responce[$k]['flag']       = $user['flag'];
        }

        if (isset($_POST['is_api']) && !empty($_POST['is_api'])) {
            // Return user list to api
            if (isset($responce) && !empty($responce)) {
                return $this->respondCreated([
                    'status'  => 1,
                    'message' => lang("Validation.user_list"),
                    'record'  => $responce,
                ]);
            } else {
                return $this->respondCreated([
                    'status'  => 0,
                    'message' => lang("Validation.record_not_found"),
                ]);
            }
        } else {
            $data['users'] = $responce;
            return view("\Modules\UserModule\Views\admin\user_list", $data);
        }
    }

    public function userRoleList()
    {
        $table  = $this->db->prefixTable('roles');
        $sql    = 'SELECT * FROM ' . $table;
        $query  = $this->db->query($sql);
        $record = $query->getResultArray();
        
        if (isset($record) && !empty($record)) {
            return $this->respondCreated([
                'status'  => 1,
                'message' => lang("Validation.record_found"),
                'record' => $record
            ]);
        } else {
            return $this->respondCreated([
                'status'  => 0,
                'message' => lang("Validation.record_not_found")
            ]);
        }
    }

    public function userAdd()
    {
        $model = new UserModel();

        $data = array();
        if (isset($_POST['name']) && !empty($_POST['name'])) {
            $data['name'] = $_POST['name'];
        }
        if (isset($_POST['email']) && !empty($_POST['email'])) {
            $data['email'] = $_POST['email'];
        }
        if (isset($_POST['mobile']) && !empty($_POST['mobile'])) {
            $data['mobile'] = $_POST['mobile'];
        }
        if (isset($_POST['email']) && !empty($_POST['email'])) {
            $data['user_name'] = $_POST['email'];
        }
        if (isset($_POST['password']) && !empty($_POST['password'])) {
            $data['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
        }
        if (isset($_POST['role_id']) && !empty($_POST['role_id'])) {
            $data['role_id'] = $_POST['role_id'];
        }
        if (isset($_POST['parent_id']) && !empty($_POST['parent_id'])) {
            $data['parent_id'] = $_POST['parent_id'];
        }
        if (isset($_POST['country']) && !empty($_POST['country'])) {
            $data['country'] = $_POST['country'];
        }
        if (isset($_POST['region']) && !empty($_POST['region'])) {
            $data['region'] = $_POST['region'];
        }
        if (isset($_POST['created_by']) && !empty($_POST['created_by'])) {
            $data['created_by'] = $_POST['created_by'];
        }
        if (isset($_POST['created_on']) && !empty($_POST['created_on'])) {
            $data['created_on'] = $_POST['created_on'];
        } else {
            $data['created_on'] = getCurrentDateTime();
        }

        $userData = $model->where('email', $_POST['email'])->first();

        if (isset($userData) && !empty($userData)) {
            return $this->respondCreated([
                'status'  => 0,
                'message' => 'User ' . lang("Validation.record_duplicate")
            ]);
        } else {
            $model->insert($data);
            $insert_id = $model->getInsertID();

            if (isset($insert_id) && !empty($insert_id)) {
                $_POST['id'] = $insert_id;
                return $this->respondCreated([
                    'status'  => 1,
                    'message' => lang("Validation.record_insert_success"),
                    'record'  => $_POST
                ]);
            } else {
                return $this->respondCreated([
                    'status'  => 0,
                    'message' => lang("Validation.record_insert_failed")
                ]);
            }
        }
    }

    public function userEdit($id = '')
    {
        $model = new UserModel();

        if (empty($_POST['id'])) {
            $id = service('uri')->getSegment(3);
        } else {
            $id = $_POST['id'];
        }

        $data = array();
        if (isset($_POST['name']) && !empty($_POST['name'])) {
            $data['name'] = $_POST['name'];
        }
        if (isset($_POST['email']) && !empty($_POST['email'])) {
            $data['email'] = $_POST['email'];
        }
        if (isset($_POST['mobile']) && !empty($_POST['mobile'])) {
            $data['mobile'] = $_POST['mobile'];
        }
        if (isset($_POST['email']) && !empty($_POST['email'])) {
            $data['user_name'] = $_POST['email'];
        }
        if (isset($_POST['password']) && !empty($_POST['password'])) {
            $data['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
        }
        if (isset($_POST['role_id']) && !empty($_POST['role_id'])) {
            $data['role_id'] = $_POST['role_id'];
        }
        if (isset($_POST['parent_id']) && !empty($_POST['parent_id'])) {
            $data['parent_id'] = $_POST['parent_id'];
        }
        if (isset($_POST['country']) && !empty($_POST['country'])) {
            $data['country'] = $_POST['country'];
        }
        if (isset($_POST['region']) && !empty($_POST['region'])) {
            $data['region'] = $_POST['region'];
        }
        if (isset($_POST['edited_by']) && !empty($_POST['edited_by'])) {
            $data['edited_by'] = $_POST['edited_by'];
        }
        if (isset($_POST['edited_on']) && !empty($_POST['edited_on'])) {
            $data['edited_on'] = $_POST['edited_on'];
        } else {
            $data['edited_on'] = getCurrentDateTime();
        }

        $userData = $model->where('id', $id)->first();

        if (isset($userData) && !empty($userData)) {

            $model->update($id, $data);
            $userData = $model->where('id', $id)->first();
            return $this->respondCreated([
                'status'  => 1,
                'message' => lang("Validation.record_update_success"),
                'record' => $userData
            ]);
        } else {
            return $this->respondCreated([
                'status'  => 0,
                'message' => lang("Validation.record_update_failed")
            ]);
        }
    }

    public function userDelete($id = '')
    {
        $model = new UserModel();

        if (empty($_POST['id'])) {
            $id = service('uri')->getSegment(3);
        } else {
            $id = $_POST['id'];
        }

        $userData = $model->where('id', $id)->first();

        if (isset($userData) && !empty($userData)) {

            $model->where('id', $id)->delete();

            return $this->respondCreated([
                'status'  => 1,
                'message' => lang("Validation.record_delete_success")
            ]);
        } else {
            return $this->respondCreated([
                'status'  => 0,
                'message' => lang("Validation.record_delete_failed")
            ]);
        }
    }
}
