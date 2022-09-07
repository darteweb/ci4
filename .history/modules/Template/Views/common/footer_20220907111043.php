</div>
</div>

<div class="clearfix"></div>

<div class="col-md-12 footer ">
<?php
    $where = array('set_key'=>'Contact');
    $contact = getSettingInfo($where);
    $email = '';
    $phone = '';
    if($contact!=false)
    {
        $contact = json_decode($contact['set_value']);
        $email = $contact->footer_email;
        $phone = $contact->footer_phone;
    }
?>
<footer>
<div class="preload_area" style="display:none;"><img src="ci4/public/images/default.svg"></div>

<div class="col-md-12 nopadding contact">
<div class="col-md-3 nopadding ftcnt-sect"> 
<h5>For Any Queries Please Contact</h5>
<p><b>Email:</b> <?php echo $email;?></p>
<!-- <p><b>Phone No.: </b><?php //echo $phone;?></p> -->
</div>
 <div class="col-md-5 nopadding">
     <div class="mnu-sect">
         <span><a href="https://www.iimtrichy.ac.in/" target="_blank">About us</a></span> 
         <span><a href="https://www.iimtrichy.ac.in/contact-us" target="_blank">Contact Us</a></span>
         <span><a href="https://www.iimtrichy.ac.in/privacy-policy" target="_blank">Privacy Policy</a></span>
         <!-- <span><a href="<?php echo SITE_URL;?>public/pdf/Refund_Policy_for_2021-23_Batches.pdf" target="_blank">Refund Policy</a></span> -->
     </div>
 </div>    
    
<div class="col-md-4 nopadding "> 
<div class="ft-rgsec">    
<span class="browser_title">For technical support <a href="mailto:itsupport@iimtrichy.ac.in" class="tech-link" title="IIMT Technical Support Team">itsupport@iimtrichy.ac.in</a> | Best Viewable In:
</span>    
<ul class="text-center browser_icon">
<li><img src="<?php echo SITE_URL;?>public/images/browser/edge_icon.png" class="img-responsive" title="Edge"><span>Edge</span></li>
<li><img src="<?php echo SITE_URL;?>public/images/browser/ch_icon.png" class="img-responsive" title="Google Chrome"><span>Chrome</span></li>
<li><img src="<?php echo SITE_URL;?>public/images/browser/ff_icon.png" class="img-responsive" title="Fire Fox"><span>Fire Fox</span></li>
<li class="saf-icon"><img src="<?php echo SITE_URL;?>public/images/browser/saf_icon.png" class="img-responsive" title="Safari"><span>Safari</span></li>
</ul>
    </div>
</div>
</div>
</footer>
</div>
</body>
</html>