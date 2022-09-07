jQuery(document).ready(function(){
        jQuery(document).on('click','#sent_otp',function(){
            jQuery(".preload_area").show();
                jQuery.ajax({
                        type: "POST",
                        url: site_url+"verify/sent-otp",
                        cache:false,
                        dataType: "html",
                        success: function(result){
                                jQuery(".preload_area").hide();
                                if(result=="error")
                                {
                                    swal("Sorry!", "Fail to sent otp", "error");
                                }else
                                {
                                    swal("Sent", "OTP Successfully", "success");
                                }
                        },
                        error: function(){
                                alert("Something Wrong! Try Again");
                        }
                });
        });

       
    
        function update_per_addrs()
        {
          if(jQuery("#same_as_mail").is(":checked")) {
            jQuery("#per_address1").val(jQuery("#mail_address1").val());
            jQuery("#per_address2").val(jQuery("#mail_address2").val());
            jQuery("#per_address3").val(jQuery("#mail_address3").val());
            jQuery("#app_per_city").val(jQuery("#app_mail_city").val());
            jQuery("#app_per_state").val(jQuery("#app_mail_state").val());
            jQuery("#app_per_pincode").val(jQuery("#app_mail_pincode").val());
            jQuery("#perman_cnty").val(jQuery("#corres_cnty").val());
          }
          else {
            jQuery("#per_address1").val('');
            jQuery("#per_address2").val('');
            jQuery("#per_address3").val('');
            jQuery("#app_per_city").val('');
            jQuery("#app_per_state").val('');
            jQuery("#app_per_pincode").val('');
            jQuery("#perman_cnty").val('');
          }
        }
     
    //mailing address and permanant address check
        jQuery("#same_as_mail").on("change", function(){
              update_per_addrs();
          }); 
          jQuery(".cor_addrs").on("keyup", function(){
            update_per_addrs();
        }); 
    //Datpicker js
        jQuery("#app_dob").datepicker({
              changeMonth: true,
              changeYear: true,
                  dateFormat: 'dd-mm-yy',
                  yearRange: "1950:2010",
                  onSelect: function (dateText, inst) {
                          jQuery('#dob-error').hide();
                          jQuery('#loginDatepicker-error').hide();
                  }
            });


    
        jQuery(document).on("click", ".btn_submit", function(event) { 
            var btn_type = jQuery(this).val();
            var frm = jQuery(this).data('frm');
            if(frm=='edu_frm')
            {

              jQuery.validator.addMethod("greaterThanZero", function(value, element) {
               // return this.optional(element) || (parseFloat(value) > 0);
               var id = jQuery(element).data('id');
               var spec = jQuery(element).data('spec');

               var marks = jQuery('.edu_marks_'+id).val().trim();
               var cgpa = jQuery('.edu_cgpa_'+id).val().trim();

               var marks_id = jQuery('.edu_marks_'+id).attr('id');
               var cgpa_id = jQuery('.edu_cgpa_'+id).attr('id');
               if(spec=='')
               {
                    if(marks=='' && cgpa=='')
                    {
                      return false;
                    }else
                    {
                      jQuery('#'+marks_id+'-error').hide();
                      jQuery('#'+cgpa_id+'-error').hide();
                      return true;
                    }
               }else
               {
                    var spec_val = jQuery('#'+spec).val().trim();
                    if(spec_val != '' && marks=='' && cgpa=='')
                    {
                      return false;
                    }else
                    {
                      jQuery('#'+marks_id+'-error').hide();
                      jQuery('#'+cgpa_id+'-error').hide();
                      return true;
                    }
               }

               //alert(id);
            }, "Enter marks or CGPA score");

            jQuery.validator.addClassRules("edu_marks",{
              greaterThanZero : true
            });

                   var validator = jQuery("#"+frm).validate({
                          ignore: [],		 
                      rules:{
                        //edu_marks : { greaterThanZero : true }
                   }     
                  });
            }else
            {
                var validator = jQuery("#"+frm).validate({
                  ignore: [],		 
              rules:{}     
                });
            }

            if(btn_type=='2')
            {
                validator.destroy();
            }
        });

        jQuery(document).on('change','.res_category',function(){

          var cate =jQuery(this).find('option:selected').val();
          var id =jQuery(this).data('id');
  
          if(cate=='9')
          {
            jQuery('#cate_other_'+id).show();
            jQuery('#cate_other_'+id).attr("required","required");
          }else
          {
            jQuery('#cate_other_'+id).hide();
            jQuery('#cate_other_'+id).removeAttr("required");
          }
  
  });
 
 
        jQuery(".count-word").on('keyup', function() {
            words = '0';
            display = jQuery(this).data('display');
            max = jQuery(this).data('max');

            if(jQuery(this).val())
            {    
            words = jQuery(this).val().match(/\S+/g).length;
            if(words >= max)
            {
              var trimmed = jQuery(this).val().split(/\s+/, max).join(" ");
              jQuery(this).val(trimmed + " ");
            }
            }
            jQuery(display).text(words);
          });  

          jQuery('body').on('focus',".month_yr_pk", function(e){

            jQuery(".month_yr_pk").datepicker({
              dateFormat: 'M/yy',
              changeMonth: true,
              changeYear: true,
              yearRange: "1901:"+current_year,
              showButtonPanel: true,
              
                  onClose: function(dateText, inst) {
                  var month = jQuery("#ui-datepicker-div .ui-datepicker-month :selected").val();
                  var year = jQuery("#ui-datepicker-div .ui-datepicker-year :selected").val();
                  jQuery(this).val(jQuery.datepicker.formatDate('M/yy', new Date(year, month, 1)));
                  var id = jQuery(this).attr('id');
                  jQuery('#'+id+'-error').hide();
              }
          });
      
          jQuery(".month_yr_pk").focus(function () {
            jQuery(".ui-datepicker-calendar").hide();
            jQuery("#ui-datepicker-div").position({
                  my: "center top",
                  at: "center bottom",
                  of: jQuery(this)
              });
          });

          });

          jQuery('body').on('focus',".yr_pk", function(e){

            jQuery('.yr_pk').datepicker({
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy',
            yearRange: "1901:"+current_year,
            onClose: function(dateText, inst) { 
                var year = jQuery("#ui-datepicker-div .ui-datepicker-year :selected").val();
                jQuery(this).datepicker('setDate', new Date(year, 1));
                var chk = jQuery(this).data('check');
                if(typeof chk !='undefined')
                {
                  var sy = jQuery(chk).val();
                  var ey = jQuery(this).val();
                  if(sy=='')
                  {
                    jQuery(this).val('');
                    swal('warning','Plesae selected start year first!');
                    return '';
                  }else if(ey!='' && ey<=sy)
                  {
                    jQuery(this).val('');
                    swal('warning','Plesae selected end year greater then of start year.');
                    return '';
                  }
                }
                var id = jQuery(this).attr('id');
                jQuery('#'+id+'-error').hide();
            }
        });
        jQuery(".yr_pk").focus(function () {
          jQuery(".ui-datepicker-month").hide();
          jQuery(".ui-datepicker-calendar").hide();
          });

      });


    });


