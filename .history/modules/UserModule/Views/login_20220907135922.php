<?= $this->extend("\Modules\Template\Views\layouts") ?>


<?= $this->section("body") ?>

<div class="col-md-7 login_area" style="min-height: 370px !important;">

        
           
            <h3 class="page-title">Login</h3>
            <div class="clearfix"></div>
            <div class="col-md-12">
<div class="clearfix"></div>

<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="">
    <a href="#login" aria-controls="login" role="tab" data-toggle="tab">
    <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>&nbsp;
    Login
    </a>
    </li>
    <li class="or"> OR </li>
    <li role="presentation" class="">
    <a href="#register" aria-controls="register" role="tab" data-toggle="tab">
    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;
    New Registration
    </a>
    </li>
</ul>
</div>
                <div class="panel-body">
                    <?php if (isset($validation)) : ?>
                        <div class="col-12">
                            <div class="alert alert-danger" role="alert">
                                <?= $validation->listErrors() ?>
                            </div>
                        </div>
                    <?php endif; ?>
                    <form class="" action="<?= base_url('login') ?>" method="post">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" name="email" id="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" id="password">
                        </div>
                        <button type="submit" class="btn btn-lg btn-success btn-block btn_add">Submit</button>
                    </form>
                </div>
            
        
    
</div>

<?= $this->endSection() ?>