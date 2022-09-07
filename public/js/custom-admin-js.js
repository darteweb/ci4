jQuery( document ).ready(function() {

    
jQuery(".validate-form").validate();

 jQuery('#personal_manager_filter input-sm').attr('name', 'search_val');

 

    jQuery("#pgpx_csv_export").on("click",function(){

	

	var frm_data = jQuery("#pgpx_frm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgpx/export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					jQuery("#test").html(result);



					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                  text: "Successfully export csv",

							  type: "success",},function(){

						      	var hid_file_path = jQuery("#hid_file_path").val();											 

								window.location.href = hid_file_path;

							  

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});

	

	

	jQuery("#accp_csv_export").on("click",function(){

	

	var frm_data = jQuery("#accp_frm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgp/export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					jQuery("#test").html(result);

                   // alert(result);    

					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                    text: "Successfully export csv",

							    type: "success",},function(){

						        var hid_file_path = jQuery("#hid_file_path").val();	

								//alert(hid_file_path);										 

							    window.location.href = hid_file_path;

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

					//jQuery("#test").html(result);

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});



	

	    jQuery("#personal_csv_export").on("click",function(){

	

	var frm_data = jQuery("#accp_frm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgp/personal_export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					jQuery("#test").html(result);

                   // alert(result);    

					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                    text: "Successfully export csv",

							    type: "success",},function(){

						        var hid_file_path = jQuery("#hid_file_path").val();	

								//alert(hid_file_path);										 

							    window.location.href = hid_file_path;

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

					//jQuery("#test").html(result);

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});

	

	    jQuery("#termfee_export_csv").on("click",function(){

	

	var frm_data = jQuery("#accp_frm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgp/termfee_export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					//jQuery("#test").html(result);

                   // alert(result);    

                    if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}else 

					{

		 	          	  swal({title: "Export csv",

			                    text: "Successfully export csv",

							    type: "success",},function(){

						        //var hid_file_path = jQuery("#hid_file_path").val();	

								//alert(hid_file_path);										 

							    window.location.href = result;

						      });

							  

					}

					//jQuery("#test").html(result);

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});



	

	    jQuery("#withdraw_export_csv").on("click",function(){

	

	var frm_data = jQuery("#accp_frm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgp/withdraw_export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					//jQuery("#test").html(result);

                   // alert(result);    

					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                    text: "Successfully export csv",

							    type: "success",},function(){

						        var hid_file_path = jQuery("#hid_file_path").val();	

								//alert(hid_file_path);										 

							    window.location.href = hid_file_path;

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

					//jQuery("#test").html(result);

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});

		

	   jQuery(document).on("click",".download_doc",function(){



           var app_no = jQuery(this).data("appno");

           var batch = jQuery(this).data("batch");

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgp/download_zip",

				data: {"app_no":app_no,"batch":batch},

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					//jQuery("#test").html(result);

					

                    if(result=="error")

					{

		 	            swal("Sorry!", "Fail to Download", "error");

					}

					else

					{

		 	          	 /* swal({title: "Download",

			                    text: "Start Download",

							    type: "success",},function(){

						      });*/

						window.location.href = result;



					}

					//jQuery("#test").html(result);

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});	

	

    jQuery("#fpm_csv_export").on("click",function(){

	

	var frm_data = jQuery("#fpmfrm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/fpm/export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					jQuery("#test").html(result);



					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                  text: "Successfully export csv",

							  type: "success",},function(){

						      	var hid_file_path = jQuery("#hid_file_path").val();											 

								window.location.href = hid_file_path;

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});

	

	jQuery("#sum_csv_export").on("click",function(){

	

	var frm_data = jQuery("#sumfrm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/summer/export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					jQuery("#test").html(result);



					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                  text: "Successfully export csv",

							  type: "success",},function(){

						      	var hid_file_path = jQuery("#hid_file_path").val();											 

								window.location.href = hid_file_path;

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});

	

	

	    jQuery("#pgpinternational_csv_export").on("click",function(){

	

	var frm_data = jQuery("#frm_manager").serialize();

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: base_url+"iimu-admin/pgp/international_app_export_csv",

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					jQuery("#test").html(result);



					if(result=="success")

					{

		 	          	  swal({title: "Export csv",

			                  text: "Successfully export csv",

							  type: "success",},function(){

						      	var hid_file_path = jQuery("#hid_file_path").val();											 

								window.location.href = hid_file_path;

						      });

							  

					}else if(result=="error")

					{

		 	                   swal("Sorry!", "Fail to export", "error");

					}

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});

	

	

	    jQuery("#action_submit_btn").on("click",function(){

	

	    var frm_data = jQuery("#accp_frm_manager").serialize();

	    var action_url = jQuery(this).data("url");

	    var actiontype = jQuery(this).data("actiontype");

	    var redirect = jQuery(this).data("redirect");

	    var result_area = jQuery(this).data("result");

	

		jQuery(".preload_area").show();

		jQuery.ajax({

				type: "POST",

				url: action_url,

				data: frm_data,

				cache:false,

				dataType: "html",

				success: function(result){

					jQuery(".preload_area").hide();

					//jQuery("#test").html(result);

                   // alert(result);    

                    if(result=="error")

					{

		 	           swal("Sorry!", "Fail to "+actiontype, "error");

					}else 

					{

		 	           swal({title: actiontype,

			                    text: "Successfully "+actiontype,

							    type: "success",},function(){

						        //var hid_file_path = jQuery("#hid_file_path").val();	

								//alert(hid_file_path);	

								if(typeof(redirect)=='undefined')

								{									 

							      window.location.href = result;

								}else

								{

								  jQuery(result_area).html(result); 

								}

						      });

							  

					}

					//jQuery("#test").html(result);

				},

				error: function(){

				         alert("Something Wrong! Try Again");

				}

       });

		

	});	

	

});