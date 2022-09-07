<div class="col-md-12 nolpadding sidebar">
    <div class="navbar-default sidebar nopadding" role="navigation">
        <div class="sidebar-nav navbar-collapse nopadding">
            <ul class="nav" id="side-menu">
                <?php 
                $current_url = get_current_url();
                $active = '';
                if($current_url == SITE_URL.'apply/links')
                {
                    $active = 'active';
                }
                ?>
                <li><a href="<?php echo SITE_URL;?>apply/links"><i class="fa fa-dashboard fa-fw"></i>Dashboard</a></li>
                <li class="<?php echo active_menu('apply/links');?>"><a href="<?php echo SITE_URL;?>apply/links" class="dropdown-toggle1" ><i class="fa fa-indent" aria-hidden="true"></i> Apply For New</a></li>
                <li id="my-app-li" class="<?php echo active_menu('apply/application-list');?>" ><a href="<?php echo SITE_URL;?>apply/application-list" class="dropdown-toggle2" ><i class="fa fa-indent" aria-hidden="true"></i> My Applications</a></li>
                <li id="my-app-li" class="<?php echo active_menu('apply/profile');?>" ><a href="<?php echo SITE_URL;?>apply/profile" class="dropdown-toggle2" ><i class="fa fa-indent" aria-hidden="true"></i> My Profile</a></li>
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
</div>
<style>
.dropdown-toggle2{
    padding: 10px 10px !important;
}
.sidebar-nav > ul > li.active > a {
    color: #e73230 !important;
    font-weight: 500;
    border-left: 3px solid #000;
}
.sidebar-nav ul li a.active {
    color: #e73230;
    font-weight: 500;
}
.sidebar-nav ul li a:hover{
    color: #e73230 !important;
}
.sidebar-nav ul li a:active {
    color: #e73230 !important;
}
a{
    color: #000 !important;
}
</style>