<?= $this->extend("\Modules\Template\Views\layouts") ?>

<?= $this->section("body") ?>

<div class="container div-mg col-md-4 col-md-offset-4" style="margin-top:20px;">
    <div class="login-panel panel panel-default">
        
           
                <div class="panel-heading"><h3 class="panel-title">Login</h3></div>
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
</div>

<?= $this->endSection() ?>