jQuery(document).ready(function(){
	jQuery("#jobs_csv_export").on("click",function(){
	   var frm_data = jQuery("#pgpx_frm_manager").serialize();
		   jQuery(".preload_area").show();
		   jQuery.ajax({
				   type: "POST",
				   url: site_url+"jobs-terminal/dashboard/app_csv_export",
				   data: frm_data,
				   cache:false,
				   dataType: "html",
				   success: function(result){
					   jQuery(".preload_area").hide();
					   //console.log(result);
					   //jQuery('#test1').html(result);
					   if(result=="error")
					   {
								swal("Sorry!", "Something went wrong!Try again", "error");
					   }else
					   {
								   window.location.href = result;
					   }
				   },
				   error: function(){
							alert("Something Wrong! Try Again");
				   }
		  });
	   });
	   jQuery(document).on("click", ".merge-pdf", function(event) { 
			jQuery(".preload_area").show();
			var user_id = jQuery(this).data('userid');
			var app_id = jQuery(this).data('appid');
			jQuery.ajax({
					type: "POST",
					url: site_url+"jobs-terminal/dashboard/merge-pdf",
					data: {
						'user_id':user_id,
						'app_id':app_id,
					},
					cache:false,
					dataType: "html",
					success: function(result){
						jQuery(".preload_area").hide();
						console.log(result);
						if(result=="error")
						{
								 swal("Sorry!", "Something went wrong!Try again", "error");
						}else
						{
							var link=document.createElement('a');
							link.href=result;
							link.download='';
							link.click();
						}
					},
					error: function(){
							 alert("Something Wrong! Try Again");
					}
		   });
		});
   jQuery("#jobs_report_export").on("click",function(){
	   var vacancy_id = jQuery("#vacancy_status").val();
	   if(vacancy_id=="")
	   {
	   swal("Sorry!", "Please choose vacancy first", "error");
		   return false;
	   }
	   var frm_data = jQuery("#pgpx_frm_manager").serialize();
		   jQuery(".preload_area").show();
		   jQuery.ajax({
				   type: "POST",
				   url: site_url+"jobs-terminal/dashboard/application_report_export",
				   data: frm_data,
				   cache:false,
				   dataType: "html",
				   success: function(result){
					   jQuery(".preload_area").hide();
					   console.log(result);
					   //jQuery("#test").html(result);
					   if(result=="error")
					   {
								swal("Sorry!", "Something went wrong!Try again", "error");
					   }else
					   {
								   window.location.href = result;
					   }
				   },
				   error: function(){
							alert("Something Wrong! Try Again");
				   }
		  });
	   });   
	   jQuery(document).on("click",".direct_login",function() {
		   jQuery(".preload_area").show();
				   var user_id = jQuery(this).data('userid');
				   var app_id = jQuery(this).data('appid');
		   jQuery.ajax({
				   type: "POST",
				   url: site_url+"jobs-terminal/dashboard/application_direct_login",
				   data: {"user_id":user_id,"app_id":app_id},
				   cache:false,
				   dataType: "html",
				   success: function(result){
					   jQuery(".preload_area").hide();
					   console.log(result);
					   if(result=="error")
					   {
								swal("Sorry!", "Something went wrong!Try again", "error");
					   }else
					   {
								  //window.location.href = result;
											var win =  window.open(result, '_blank');
									   if (win) {
										   //Browser has allowed it to be opened
										   win.focus();
									   } else {
										   //Browser has blocked it
										   alert('Please allow popups for this website');
									   }
					   }
				   },
				   error: function(){
							alert("Something Wrong! Try Again");
				   }
		  });
	   });        
   jQuery("#jobs_doc_export").on("click",function(){
	   var frm_data = jQuery("#pgpx_frm_manager").serialize();
		   jQuery(".preload_area").show();
		   jQuery.ajax({
							   type: "POST",
							   url: site_url+"jobs-terminal/dashboard/application_zip_export",
							   data: frm_data,
							   cache:false,
							   dataType: "html",
							   success: function(result){
									   jQuery(".preload_area").hide();
									   var resobj = JSON.parse(result);
									   if(resobj.type == 'error')
									   {
										   swal("Sorry!", "Something went wrong!Try again", "error");
									   }else
									   {
										  window.location.href = resobj.redirect;
									   }
							   },
							   error: function(){
										alert("Something Wrong! Try Again");
							   }
			   });
	   });        
   });