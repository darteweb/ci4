<?= $this->extend("\Modules\Template\Views\layouts") ?>

<?= $this->section("body") ?>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="<?= base_url('user/dashboard')?>">Dashboard</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="">
                    User List
                    <span class="sr-only">(current)</span>
                </a>
            </li>
        </ul>
    </div>
</nav>

<div class="container">
    <div class="card">
        <div class="card-header">
            <h4>User List</h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($users) && !empty($users)) {
                    ?>
                        <?php
                        $i = 1;
                        foreach ($users as $user) { ?>
                            <tr>
                                <td><?= $i ?></td>
                                <td><?= $user['name'] ?></td>
                                <td><?= $user['email'] ?></td>
                                <td><?= $user['mobile'] ?></td>
                                <td>
                                    <?php if ($user['role_id'] == 1) {
                                        echo "Admin";
                                    } ?>
                                    <?php if ($user['role_id'] == 2) {
                                        echo "Faculty";
                                    } ?>
                                    <?php if ($user['role_id'] == 3) {
                                        echo "Student";
                                    } ?>
                                </td>
                            </tr>
                        <?php
                            $i++;
                        }
                        ?>
                    <?php } else { ?>
                        <tr>
                            No records found
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?= $this->endSection() ?>