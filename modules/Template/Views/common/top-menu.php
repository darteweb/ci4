<div class="col-md-12 nopadding logout-area">
<?php
$logout_url = SITE_URL.'login/logout';
$dashboard = SITE_URL.'apply/links';	
?>
<a class="btn btn-default btn-sm submit logout" href="<?php echo $logout_url;?>"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</a>
<a class="btn btn-default btn-sm submit dashboard" href="<?php echo $dashboard;?>"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Dashboard</a>

</div>