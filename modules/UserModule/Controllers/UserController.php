<?php

namespace Modules\UserModule\Controllers;

use App\Controllers\BaseController;
use Modules\UserModule\Models\UserModel;

use CodeIgniter\API\ResponseTrait;
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;

class UserController extends BaseController
{
    use ResponseTrait;
    
    public function __construct()
    {        
        // 
    }

    public function login()
    {
        $data = [];

        if ($this->request->getMethod() == 'post') {

            $rules = [
                'email' => 'required|min_length[6]|max_length[50]|valid_email',
                'password' => 'required|min_length[6]|max_length[255]|validateUser[email,password]',
            ];

            $errors = [
                'password' => [
                    'validateUser' => lang("Validation.login_false"),
                ],
            ];

            if (!$this->validate($rules, $errors)) {
                if (isset($_POST['is_api']) && !empty($_POST['is_api'])) {
                    return $this->respondCreated([
                        'status'  => 0,
                        'message' => lang("Validation.login_false")
                    ]);
                } else {
                    return view('\Modules\UserModule\Views\login', [
                        "validation" => $this->validator,
                    ]);
                }
            } else {
                $model = new UserModel();
                $user  = $model->where('email', $this->request->getVar('email'))->first();

                // Update last login time in users
                $uid = $user['id'];
                $date_time = date('Y-m-d h:m:s');
                $u_d = [
                    'last_login' => $date_time,
                ];
                $model->update($uid, $u_d);

                if (isset($_POST['is_api']) && !empty($_POST['is_api'])) {
                    // Return user details to api
                    $jwt_key = getenv('JWT_SECRET');

                    $iat = time(); // current timestamp value
                    $exp = $iat + 3600; // 3600 = 60 minutes
                    
                    $payload = [
                        "iss" => "localhost",
                        "aud" => "localhost",
                        "exp" => $exp, // Expiration time of token
                        "data" => [
                            'id'         => $user['id'],
                            'name'       => $user['name'],
                            'email'      => $user['email'],
                            'mobile'     => $user['mobile'],
                            'role_id'    => $user['role_id'],
                            'parent_id'  => $user['parent_id'],
                            'country'    => $user['country'],
                            'region'     => $user['region'],
                            'exp'        => $exp,
                            'is_api'     => 1,
                            'isLoggedIn' => true,
                        ]
                    ];
                    $jwt = JWT::encode($payload, $jwt_key, 'HS256');
                    return $this->respondCreated([
                        'status'  => 1,
                        'jwt'     => $jwt,
                        'message' => lang("Validation.login_success")
                    ]);

                    // Stroing session values
                    $user['jwt']  = $jwt;
                    $user_session = $this->setUserSession($user);
                } else {
                    // Stroing session values
                    $user_session = $this->setUserSession($user);

                    if ($user_session['isLoggedIn'] == true) {
                        return redirect()->to(base_url('user/dashboard'));
                    }
                }
            }
        }
        return view('\Modules\UserModule\Views\login');
    }

    private function setUserSession($user)
    {
        if (isset($_POST['is_api']) && !empty($_POST['is_api'])) {
            $is_api = '1';
        } else {
            $is_api = '0';
        }
        $data = [
            'id'         => $user['id'],
            'name'       => $user['name'],
            'email'      => $user['email'],
            'mobile'     => $user['mobile'],
            "role_id"    => $user['role_id'],
            "parent_id"  => $user['parent_id'],
            "country"    => $user['country'],
            "region"     => $user['region'],
            "is_api"     => $is_api,
            'isLoggedIn' => true,
        ];

        session()->set($data);
        return $data;
    }

    public function readUser()
    {
        $jwt_key = getenv('JWT_SECRET');
        $request = service('request');
        $headers = $request->getHeader('authorization');
        $jwt     = $headers->getValue();
        try {
            $userData = JWT::decode($jwt, new KEY($jwt_key, 'HS256'));
            if(isset($userData) && !empty($userData)) {
                $users    = $userData->data;
                return $this->respond([
                    'status' => 1,
                    'users'  => $users
                ]);
            } else {
                return $this->respond([
                    'status'  => 'false',
                    'message' => lang("Validation.record_not_found")
                ]);
            }
        } catch (\Exception $ex) {
            $response = service('response');
            $response->setBody('Access denied token expired');
            $response->setStatusCode(401);
            return $response;
        }
    }

    public function logout()
    {
        if (isset($_POST['is_api']) && !empty($_POST['is_api'])) {
            session()->destroy();
            return $this->respondCreated([
                'status'  => 1,
                'message' => lang("Validation.logout_success")
            ]);
        } else {
            session()->destroy();
            return redirect()->to('login');
        }
    }
}
