<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE, NO-STORE, must-revalidate">
<META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
<META HTTP-EQUIV="EXPIRES" CONTENT=0>
<title>IIM</title>
<!--favicon icon-->
<link rel="shortcut icon" href="ci4/public/images/favicon.ico" type="" />
<!--Jquery Library-->
<script type='text/javascript' src="ci4/public/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" type="text/css" href="ci4/public/css/style.css">

<!--For Datepicker-->
<link rel="stylesheet" href="ci4/public/css/jquery-ui.css">
<script src="ci4/public/js/jquery-ui.min.js"></script>

<!--Bootstrap Library-->
<link rel="stylesheet" type="text/css" href="ci4/bootstrap/css/bootstrap.min.css">
<script type='text/javascript' src="ci4/bootstrap/js/bootstrap.min.js"></script>
<!--JS Validation-->
<script type='text/javascript' src="ci4/public/js/jquery.validate.min.js"></script>
<!--Date Time picker js-->
<script type='text/javascript' src="ci4/public/js/custom-js.js"></script>  
<!--Custom js-->
<script type='text/javascript' src="ci4/public/js/jquery.countdown.min.js"></script>  
<!--Uploadify-->
<script type='text/javascript' src="<?php echo base_url(); ?>public/uploadifive/js/jquery.uploadifive.min.js"></script> 
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>public/uploadifive/css/uploadifive.css"> 

<!--Sweet alert -->
<script type='text/javascript' src="<?php echo base_url(); ?>public/sweetalert/js/sweetalert.min.js"></script> 
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>public/sweetalert/css/sweetalert.css">
<script>
var current_year = "<?php echo getCurrentDate();?>";
var site_url = "<?php echo SITE_URL;?>";
var last_date = "<?php echo '30-06-2018';?>";
</script>
<script type='text/javascript' src="<?php echo SITE_URL; ?>public/js/jobs-script.js"></script> 
</head>
<body>
<div class="container">
<header class="header_area home_head">
<div class="col-md-6">
<div class="logo-iimt">    
<a href="<?php echo site_url(); ?>" title="IIM">
<img src="<?php echo SITE_URL;?>public/images/iimt-logo.png" class="img-responsive" title="Indian Institute Of Management" />
<!--<h2>IIM</h2>-->
</a>
</div>
</div>
</header>
</div>

<div class="col-md-12 tag_area">
<div class="container nopadding"> 
<div style="clear:both"></div>
<div class="innertitle"><h3 class="tag_line_home"><?php echo Institute_Name ;?></h3></div>
<div style="clear:both"></div>
<div class="innertitle"><h3 class="tag_line_home">Application for Faculty Positions</h3></div>
</div>
<div class="container inner_page home_page">
<!--<form class="form-horizontal" id="loginForm">-->