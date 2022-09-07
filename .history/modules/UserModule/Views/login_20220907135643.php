<?= $this->extend("\Modules\Template\Views\layouts") ?>


<?= $this->section("body") ?>

<div class="col-md-7 login_area" style="style="min-height: 370px !important;"">

        
           
            <h3 class="page-title" style="text-align:center">Login</h3>
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