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
    <li class="or">  </li>
    <li role="presentation" class="">
    <a href="#register" aria-controls="register" role="tab" data-toggle="tab">
    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;
    New Registration
    </a>
    </li>
</ul>
</div>
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="login">
    <br>
 <form action="<?= base_url('login') ?>" id="login_frm" method="post" accept-charset="utf-8">

   <div class="form-group">
    <label for="loginEmail" class="col-sm-12 control-label">E-mail ID <sup><span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span></sup></label>
    <div class="col-sm-12">
      <input type="email" class="form-control small email required" id="email" name="email" placeholder="Email*" value="" required="" autocomplete="off">
    </div>
  </div>
  <div class="col-sm-12" style="margin-top: 10px;"></div>
  <div class="form-group">
    <label for="loginDatepicker" class="col-sm-12 control-label">Password <sup><span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span></sup></label>
    <div class="col-sm-12">
      <input type="password" class="form-control required" id="password" name="password" placeholder="Password*" value="" required="" autocomplete="off">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-12">
      <button type="submit" class="btn btn-default submit"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Sign in</button>
    </div>
  </div>
</form>
    </div><!--login-->
    <div role="tabpanel" class="tab-pane" id="register">
    <br>
    <form action="" id="reg_frm" method="post" accept-charset="utf-8" novalidate="novalidate">
        <div class="form-group clearfix">
            <label for="reg_name" class="col-sm-12 control-label">Name <sup><span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span></sup></label>
            <div class="col-sm-12">
                <input type="text" class="form-control capital required" id="reg_name" name="reg_name" placeholder="Name*" value="" required="" aria-required="true">
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="reg_email" class="col-sm-12 control-label">E-mail ID <sup><span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span></sup></label>
            <div class="col-sm-12">
                <input type="email" class="form-control live_check small required" data-url="https://jobsiimv.dhavalhost.com/jobs/login/live_email_check" data-message="Email is already registered" id="reg_email" name="reg_email" placeholder="Email*" value="" required="required" autocomplete="off" aria-required="true">
           </div>
        </div>
        <div class="form-group clearfix">
            <label for="reg_mobile" class="col-sm-12 control-label">Mobile <sup><span class="glyphicon glyphicon-asterisk" aria-hidden="true"></span></sup></label>
            <div class="col-sm-12">
                <input type="text" class="form-control live_check required" data-url="" data-message="Mobile number is already registered" id="reg_mobile" minlength="10" maxlength="10" name="reg_mobile" placeholder="Mobile*" value="" required="" autocomplete="off" aria-required="true">
            </div>
        </div>

<!--<div class="col-sm-12" style="margin-top:15px;">
<div class="col-sm-12 nopadding g-recaptcha-area">
<div class="g-recaptcha pull-right" data-sitekey="6LdlRh8UAAAAAFZfA5yJPWRuBM5hyvRrw8Rr_tC-" data-theme="light" data-type="image" data-callback="" ></div>
<input type="hidden" class="hiddenRecaptcha required" name="hiddenRecaptcha" id="hiddenRecaptcha">
</div>
</div>-->
  <div class="form-group">
    <div class="col-sm-12">
      <input type="text" class="form-control hidden" id="reg_verify" name="reg_verify" value="">
      <button type="submit" class="btn btn-default submit reg-btn"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Register Now</button>
    </div>
  </div>
</form>
    </div><!--register-->
</div>
        
    
</div>

<?= $this->endSection() ?>