<?= $this->extend("\Modules\Template\Views\layouts") ?>

<?= $this->section("body") ?>

<div class="container" style="margin-top:20px;">
    <div class="row">
        <div class="col-sm-11">
            <div>
                <div style="height:50px; color:#fff;">
                    <div class="pull-left">
                        <h4>Admin Dashboard</h4>
                    </div>
                    <div class="pull-right">
                        <a href="<?= site_url('logout') ?>">
                            <button class="btn btn-danger">
                                Logout
                            </button>
                        </a>
                    </div>
                </div>
                <div class="panel-body">
                    <h1>Hello, <?= session()->get('name') ?> from admin</h1>
                    <h3><a href="<?= site_url('user/list') ?>">User List</a></h3>
                    <h3></h3>
                </div>
            </div>
        </div>
    </div>
</div>

<?= $this->endSection() ?>