jQuery(document).ready(function(){

	function decre_max(that)
	{
		var table = that.closest('table').attr('id');
		var max = jQuery('#'+table).data('max');

		maxval = jQuery('#'+max).val(); 
		maxval = maxval-1;
		jQuery('#'+max).val(maxval); 
	}

	function max_count(sno)
	{
		return jQuery("td."+sno).length;
	} 
	
    function set_no(sno)
	{
		i = 1;
		jQuery("td."+sno).each(function() {
			jQuery(this).html(i);
		  i++;
		});
	}  

	function get_option(data)
	{
		var data = JSON.parse(data);
        var option = '<option value="">-Select-</option>';
		console.log(data);
		jQuery.each(data, function(key, value){
			option = option+'<option value="'+key+'">'+value+'</option>';
		});
		return option
	}
  
  
	function cal_total(date_id)
	{
		dateid = date_id.split("_");
		midfix = dateid[0];
		jQuery(".preload_area").show();
			jQuery.ajax({
				type: "POST",
				url: site_url+"apply/calculate-total-exp/"+dateid[0],
				data: jQuery('#workexp_frm').serialize(),
				cache:false,
				dataType: "html",
				success: function(result){
					jQuery(".preload_area").hide();
					var obj = jQuery.parseJSON(result);
					jQuery('#'+midfix+'_overall_years').val(obj.total_years);
					jQuery('#'+midfix+'_overall_months').val(obj.total_months);
					jQuery('#'+midfix+'_overall_days').val(obj.total_days);
					jQuery('#'+midfix+'_contract_years').val(obj.cont_years);
					jQuery('#'+midfix+'_contract_months').val(obj.cont_months);
					jQuery('#'+midfix+'_contract_days').val(obj.cont_days);
					jQuery('#'+midfix+'_regular_years').val(obj.reg_years);
					jQuery('#'+midfix+'_regular_months').val(obj.reg_months);
					jQuery('#'+midfix+'_regular_days').val(obj.reg_days);
				},
				error: function(){
					jQuery(".preload_area").hide();
						alert("Something Wrong! Try Again");
				}
		});
	}

	jQuery(document).on('change','.nature',function(){
		var date_id = jQuery(this).data('id');
		cal_total(date_id);
	});

	function get_phd_exp()
	{
		jQuery(".preload_area").show();
			jQuery.ajax({
				type: "POST",
				url: site_url+"apply/get-phd-exp",
				data: jQuery('#workexp_frm').serialize(),
				cache:false,
				dataType: "html",
				success: function(result){
					jQuery(".preload_area").hide();
					var obj = jQuery.parseJSON(result);
					if(obj.status=='error')
					{
					 // swal("Sorry!", "Invalid Phd complete date selected", "warning");
					}

					var phd_date = jQuery("#phd_date").val();
					if(phd_date!="")
					{
						jQuery('#phd_year').val(obj.phd_year);
						jQuery('#phd_month').val(obj.phd_month);
						jQuery('#phd_day').val(obj.phd_day);
					}


				},
				error: function(){
					jQuery(".preload_area").hide();
						alert("Something Wrong! Try Again");
				}
		});
	}
	
    function get_date_diff(from,to,date_id)
	{
		jQuery(".preload_area").show();
			jQuery.ajax({
				type: "POST",
				url: site_url+"apply/get-date-diff",
				data: { 
					'from': from, 
					'to': to
				},
				cache:false,
				dataType: "html",
				success: function(result){
					jQuery("#info_period_"+date_id).val(result);
					cal_total(date_id);
					jQuery(".preload_area").hide();
				},
				error: function(){
					jQuery(".preload_area").hide();
						alert("Something Wrong! Try Again");
				}
		});
	}

	jQuery('body').on('focus',".info_duration", function(e){
		jQuery(this).datepicker({
		  changeMonth: true,
		  changeYear: true,
		  dateFormat: 'dd-mm-yy',
		  maxDate: 'today',
		  yearRange: "1950:"+current_year,

		  onSelect: function (dateText, inst) {
			jQuery(e.target).closest('.col-sm-12,td').find('label.error').hide();
			var date_id = jQuery(this).data('id');
			var classid = jQuery(this).data('classid');
			var phd = jQuery(this).data('phd');

			if(typeof phd != 'undefined')
			{
				get_phd_exp();
			}
            var cls1 = jQuery(this).hasClass("release_date");
			var cls2 = jQuery(this).hasClass("date_of_joining");

			if(cls1==true)
			{
				get_phd_exp();
			}
			if(cls2==true)
			{
				get_phd_exp();
			}

			if(typeof date_id != 'undefined')
			{
				var date_joining = jQuery("#info_date_of_joining_"+date_id).val();
				var release_date = jQuery("#info_release_date_"+date_id).val();
				var current_working = jQuery("#current_working_"+date_id+":checked").val();
							var period_show = "Yes";
				if(current_working=='1')
				{
				   //alert(current_year);
				   release_date = currentlydate;
							   period_show = "No";
				}
				if(date_joining=="")
				{
					 jQuery("#info_release_date_"+date_id).val('');
						 swal("Sorry!", "Please choose joining date first", "warning");
					 return false;
				}


				if(release_date!="" && date_joining!="")
				{			   
				   var array_joining = date_joining.split('-');
				   var array_release = release_date.split('-');
				   joining_day = array_joining[0];
				   joining_month = array_joining[1];
				   joining_month = joining_month-1;
				   joining_year = array_joining[2];
				   release_day = array_release[0];
				   release_month = array_release[1];
				   release_month = release_month-1;
				   release_year = array_release[2];
					//var past_date = new Date(date_joining);
					var past_date = new Date(joining_year,joining_month,joining_day);
					var current_date = new Date(release_year,release_month,release_day);

					if( past_date > current_date)
					{
	
						swal("Sorry!", "Invalid date selected.", "warning");
						jQuery("#info_release_date_"+date_id).val('');
						jQuery("#info_period_"+date_id).val('');
						cal_total(date_id);
						return "";
	
					}

					// var difference = current_date.getMonth() - past_date.getMonth()+ (12 * (current_date.getFullYear() - past_date.getFullYear()));

					// if(difference>=12)
					// {
					// 	var period = difference/12;

					// 	var cel = Math.ceil(period);

					// 	alert(period);


					// 	period = period.toFixed(2);

					// 	alert(period);

					// }else
					// {
					// 	var period = '0.'+difference;
					// }
					get_date_diff(date_joining,release_date,date_id)

					// var day_start = past_date;
					// var day_end = current_date;
					// var total_days = (day_end - day_start) / (1000 * 60 * 60 * 24);
					// total_days = total_days+1;
					// if(total_days<0)
					// {
					//    total_days = 0;
					// }
					jQuery("#info_date_of_joining_"+date_id+"-error");
					jQuery("#info_release_date_"+date_id+"-error");
					//total_days = Math.ceil(total_days);
					//jQuery("#info_period_"+date_id).val(total_days);
					//sum(classid);
				}
			}
		}
		});
	});


	function remove_work_exp(that)
	{
		swal({
			title: "Are you sure?",
			text: "After delete row you will not be able to recover!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5cb85c",
			confirmButtonText: "Yes, I am sure!",
			cancelButtonText: "No, cancel",
			closeOnConfirm: false,
			closeOnCancel: true
		  },
		  function(isConfirm){
			  if(isConfirm) {
				  jQuery(".sweet-alert").addClass("hideSweetAlert");
				  jQuery("body").removeClass(" stop-scrolling");
				  jQuery(".sweet-overlay").hide();
				  jQuery(".sweet-alert").hide();

					decre_max(that);
					var table = that.closest('table').attr('id');

					var row_id = that.data('rowid');
					var date_id = that.data('id');

                    jQuery('.work_exp_row_'+row_id).remove();

					var sno = jQuery('#'+table).data('sno');
					set_no(sno);
					cal_total(date_id);
					get_phd_exp();

			  }  // confirm
		  }); // end swal

	}


	jQuery(document).on('click','.btn-remove-workexp',function(){
		var that = jQuery(this);
		remove_work_exp(that)
	  });

	  function remove_adc_row(that)
	  {

		swal({
			title: "Are you sure?",
			text: "After delete row you will not be able to recover!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5cb85c",
			confirmButtonText: "Yes, I am sure!",
			cancelButtonText: "No, cancel",
			closeOnConfirm: false,
			closeOnCancel: true
		  },
		  function(isConfirm){
			  if(isConfirm) {
				  jQuery(".sweet-alert").addClass("hideSweetAlert");
				  jQuery("body").removeClass(" stop-scrolling");
				  jQuery(".sweet-overlay").hide();
				  jQuery(".sweet-alert").hide();

					decre_max(that);
					var table = that.closest('table').attr('id');

					var row_id = that.data('rowid');
					var date_id = that.data('id');

                    jQuery('.ind_exp_row_'+row_id).remove();

					var sno = jQuery('#'+table).data('sno');
					set_no(sno);
					cal_total(date_id);
					get_phd_exp();

			  }  // confirm
		  }); // end swal
	  }
  
	  jQuery(document).on('click','.btn-remove-ind-exp',function(){
		  var that = jQuery(this);
		  remove_adc_row(that);
		});
  


	jQuery('#anc_add').on('click',function()
	{
		 
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=max_row)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		 
		var s_no = Number(work_exp_row)+1; 
		var filed = 'academic_document_'+ work_exp_row; 
		var field_title = 'Document';
		var filename = 'academic_exp['+work_exp_row+'][academic_document]';
		var get_uploadifive_filed = set_uploadifive_html(filed, field_title,filename,'','required');
		jQuery('#info_work_experience').append('<tr class="work_exp_row_'+work_exp_row+'"> <td class="adc_sno">'+s_no+'</td><td><input type="text" name="academic_exp['+work_exp_row+'][organization]" id="organization_'+work_exp_row+'" data-id="adc_'+work_exp_row+'" class="form-control check_nature" value="" required=""/></td><td><input type="text" name="academic_exp['+work_exp_row+'][designation]" id="designation_'+work_exp_row+'" data-id="adc_'+work_exp_row+'" class="form-control" value="" required=""/></td><td> <input type="text" name="academic_exp['+work_exp_row+'][joining]" class="form-control date_of_joining info_duration" id="info_date_of_joining_adc_'+work_exp_row+'" data-classid="info_period_work_exp" data-id="adc_'+work_exp_row+'" placeholder="Date of Joining" readonly="readonly" value="" required/> </td><td> <input type="text" name="academic_exp['+work_exp_row+'][release]" class="form-control release_date release_date_work_exp info_duration" id="info_release_date_adc_'+work_exp_row+'" data-classid="info_period_work_exp" data-id="adc_'+work_exp_row+'" placeholder="Release Date" readonly="readonly" value="" required/> <input type="hidden" value="" name="academic_exp['+work_exp_row+'][period]" min="0" class="form-control info_period_adc" id="info_period_adc_'+work_exp_row+'" data-id="adc_'+work_exp_row+'"/> </td><td> <select name="academic_exp['+work_exp_row+'][nature]" class="form-control nature" id="nature_adc_'+work_exp_row+'" data-id="adc_'+work_exp_row+'" required> <option value="">-Select-</option> <option value="1">Regular</option> <option value="2">Contract</option> </select> </td><td>'+ get_uploadifive_filed +'</td><td> <button type="button" data-id="adc_'+work_exp_row+'" data-rowid="'+work_exp_row+'" class="btn btn-danger btn-remove-workexp"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		work_exp_row++;
		set_no(sno);
		set_uploadifive_script(filed,'',field_title,timestamp,unique_salt,'',app_post,user_folder_url);
		
		
	});
	jQuery('#ind_add').on('click',function()
	{
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=max_row)
		{
			swal('warning',"You can't add more rows");
            return "";
		}

		var filed = 'industry_document_'+ ind_exp_row; 
		var field_title = 'Document';
		var filename = 'industry_exp['+ind_exp_row+'][documents]';
		var get_uploadifive_filed = set_uploadifive_html(filed, field_title,filename,'','required');
	
		jQuery('#industry_exp').append('<tr class="ind_exp_row_'+ind_exp_row+'"> <td class="ind_sno"></td><td><input type="text" name="industry_exp['+ind_exp_row+'][organization]" id="organization_ind_'+ind_exp_row+'" data-id="ind_'+ind_exp_row+'" class="form-control check_nature" value="" required=""/></td><td><input type="text" name="industry_exp['+ind_exp_row+'][designation]" id="designation_ind_'+ind_exp_row+'" data-id="ind_'+ind_exp_row+'" class="form-control" value="" required=""/></td><td> <input type="text" name="industry_exp['+ind_exp_row+'][joining]" class="form-control month_year date_of_joining info_duration" id="info_date_of_joining_ind_'+ind_exp_row+'" data-classid="info_period_ind_exp" data-id="ind_'+ind_exp_row+'" placeholder="Date of Joining" readonly="readonly" value="" required/> </td><td> <input type="text" name="industry_exp['+ind_exp_row+'][release]" class="form-control release_date month_year release_date_work_exp info_duration" id="info_release_date_ind_'+ind_exp_row+'" data-classid="info_period_ind_exp" data-id="ind_'+ind_exp_row+'" placeholder="Release Date" readonly="readonly" value="" required/> <input type="hidden" value="" name="industry_exp['+ind_exp_row+'][period]" min="0" class="form-control info_period_ind" id="info_period_ind_'+ind_exp_row+'" data-id="ind_'+ind_exp_row+'"/> </td><td> <select name="industry_exp['+ind_exp_row+'][nature]" class="form-control nature" id="nature_ind_'+ind_exp_row+'" data-id="ind_'+ind_exp_row+'" required> <option value="">-Select-</option> <option value="1">Regular</option> <option value="2">Contract</option> </select> </td><td>'+ get_uploadifive_filed +'</td><td> <button type="button" data-id="ind_'+ind_exp_row+'" data-rowid="'+ind_exp_row+'" class="btn btn-danger btn-remove-ind-exp"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		ind_exp_row++;
		set_no(sno);
		set_uploadifive_script(filed,'',field_title,timestamp,unique_salt,'',app_post,user_folder_url);
    });

	jQuery('#cor_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=max_row)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
    	var option = get_option(course_level);
		jQuery('#course_exp').append('<tr class="cor_row_'+cor_row+'"><td class="cor_sno" ></td><td><input type="text" name="course_exp['+cor_row+'][institution]" id="institution_'+cor_row+'" class="form-control" value="" required=""></td><td><input type="text" name="course_exp['+cor_row+'][title]" id="title_'+cor_row+'" class="form-control" value="" required=""></td><td><select name="course_exp['+cor_row+'][level]" class="form-control level" id="level_'+cor_row+'" required="">'+option+'</select></td><td><input type="text" name="course_exp['+cor_row+'][year]" id="year_'+cor_row+'" class="form-control numdashonly" minlength="7" maxlength="7" value="" required=""></td><td><input type="text" name="course_exp['+cor_row+'][core]" id="core_'+cor_row+'" class="form-control" value="" required=""></td><td> <button type="button" data-rowid="cor_row_'+cor_row+'" class="btn btn-danger btn-remove-cor-exp"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		cor_row++;
		set_no(sno);
    });	

	jQuery('#res_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=10)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
    	var option = get_option(journal_cate);
		jQuery('#research_exp').append('<tr class="res_row_'+res_row+'"> <td class="res_sno"></td><td><input type="text" name="research['+res_row+'][journal]" id="journal_'+res_row+'" class="form-control" value="" required=""/></td><td> <select name="research['+res_row+'][category]" class="form-control res_category" data-id="'+res_row+'" id="res_category_'+res_row+'" required=""> '+option+' </select> <input style="margin-top: 10px; display: none;" type="text" name="research['+res_row+'][cate_other]" id="cate_other_'+res_row+'" class="form-control" placeholder="Others" value="" required/> </td><td><input type="text" name="research['+res_row+'][title]" id="res_title_'+res_row+'" class="form-control" value="" required=""/></td><td><input type="text" name="research['+res_row+'][author]" id="author_'+res_row+'" class="form-control numberonly" value="" required=""/></td><td><input type="text" name="research['+res_row+'][publication]" id="publication_'+res_row+'" class="form-control month_yr_pk" readonly value="" required=""/></td><td><input type="text" name="research['+res_row+'][vol_no]" id="vol_no_'+res_row+'" class="form-control numberonly" value="" required=""/></td><td><input type="text" name="research['+res_row+'][issue_no]" id="issue_no_'+res_row+'" class="form-control numberonly" value="" required=""/></td><td> <button type="button" data-rowid="res_row_'+res_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		res_row++;
		set_no(sno);
    });
	
	jQuery('#case_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=5)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#case_std').append('<tr class="case_row_'+case_row+'"><td class="case_sno" ></td><td><input type="text" name="case_std['+case_row+'][publisher]" id="case_std_publisher_'+case_row+'" class="form-control" value="" required=""></td><td><input type="text" name="case_std['+case_row+'][title]" id="case_std_title_'+case_row+'" class="form-control" value="" required=""></td><td><input type="text" name="case_std['+case_row+'][author]" id="case_std_author_'+case_row+'" class="form-control" value="" required=""></td><td><input type="text" name="case_std['+case_row+'][publication]" id="case_std_publ_'+case_row+'" class="form-control month_yr_pk" readonly value="" required=""></td><td><button type="button" data-rowid="case_row_'+case_row+'" class="btn btn-danger remove-case-std"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		case_row++;
		set_no(sno);
    });
	jQuery('#book_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=5)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		var option = get_option(authored_type);
		jQuery('#book_tbe').append('<tr class="book_row_'+book_row+'"><td class="book_sno" ></td><td><input type="text" name="books['+book_row+'][title]" id="bk_title_'+book_row+'" class="form-control" value="" required=""></td><td><input type="text" name="books['+book_row+'][publisher]" id="bk_publisher_'+book_row+'" class="form-control" value="" required=""></td><td><select name="books['+book_row+'][authored]" class="form-control authored" id="authored_'+book_row+'" data-id="'+book_row+'" required="">'+option+'</select></td><td><input type="text" name="books['+book_row+'][author]" id="bk_author_'+book_row+'" class="form-control numberonly" value="" required=""></td><td><input type="text" name="books['+book_row+'][publication]" id="bk_publ_'+book_row+'" class="form-control numberonly" minlength="4" maxlength="4" value="" required=""></td><td><button type="button" data-rowid="book_row_'+book_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		book_row++;
		set_no(sno);
    });
	
	jQuery('#bookchp_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=5)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#bookchp_tbe').append('<tr class="bookchp_row_'+bookchp_row+'" ><td class="bkchp_sno" ></td><td><input type="text" name="book_chap['+bookchp_row+'][title]" id="bkchp_title_'+bookchp_row+'" class="form-control" value="" required ></td><td><input type="text" name="book_chap['+bookchp_row+'][publisher]" id="bkchp_publisher_'+bookchp_row+'" class="form-control" value="" required ></td><td><input type="text" name="book_chap['+bookchp_row+'][author]" id="bkchp_author_'+bookchp_row+'" class="form-control numberonly" value="" required ></td><td><input type="text" name="book_chap['+bookchp_row+'][publication]" id="bkchp_publ_'+bookchp_row+'" class="form-control numberonly" maxlength="4" minlength="4" value="" required ></td><td> <button type="button" data-rowid="bookchp_row_'+bookchp_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		bookchp_row++;
		set_no(sno);
    });

	jQuery('#proc_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=10)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#proc_tbe').append('<tr class="proc_row_'+proc_row+'"> <td class="proc_sno" ></td><td><input type="text" name="proce_paper['+proc_row+'][conference]" id="proc_conference_'+proc_row+'" class="form-control" value="" required=""></td><td><input type="text" name="proce_paper['+proc_row+'][title]" id="proc_title_'+proc_row+'" class="form-control" value="" required=""></td><td><input type="text" name="proce_paper['+proc_row+'][author]" id="proc_author_'+proc_row+'" class="form-control numberonly" value="" required=""></td><td><input type="text" name="proce_paper['+proc_row+'][year]" id="proc_year'+proc_row+'" class="form-control month_yr_pk" readonly="" value="" required=""></td><td> <button type="button" data-rowid="proc_row_'+proc_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		proc_row++;
		set_no(sno);
    });

	jQuery('#conf_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=10)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#conf_tbe').append('<tr class="conf_row_'+conf_row+'"> <td class="conf_sno" ></td><td><input type="text" name="conf_paper['+conf_row+'][conference]" id="conf_conference_'+conf_row+'" class="form-control" value="" required=""></td><td><input type="text" name="conf_paper['+conf_row+'][title]" id="conf_title_'+conf_row+'" class="form-control" value="" required=""></td><td><input type="text" name="conf_paper['+conf_row+'][author]" id="conf_author_'+conf_row+'" class="form-control numberonly" value="" required=""></td><td><input type="text" name="conf_paper['+conf_row+'][year]" id="conf_year'+conf_row+'" class="form-control month_yr_pk" readonly="" value="" required=""></td><td> <button type="button" data-rowid="conf_row_'+conf_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		conf_row++;
		set_no(sno);
    });
	
	jQuery('#respro_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=10)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#respro_tbe').append('<tr class="respro_row_'+respro_row+'"> <td class="respro_sno" ></td><td><input type="text" name="res_pro['+respro_row+'][title]" id="res_pro_title_'+respro_row+'" class="form-control" value="" required=""></td><td> <select name="res_pro['+respro_row+'][investigator]" id="res_pro_invest_'+respro_row+'" class="form-control" required=""> <option value="">-Select-</option> <option value="Yes">Yes</option> <option value="No">No</option> </select> </td><td><input type="text" name="res_pro['+respro_row+'][sponsor]" id="res_pro_sponsor_'+respro_row+'" class="form-control" value="" required=""></td><td><input type="text" name="res_pro['+respro_row+'][award_year]" id="res_pro_award_year'+respro_row+'" class="form-control month_yr_pk" readonly value="" required=""></td><td><input type="text" name="res_pro['+respro_row+'][comp_year]" id="res_pro_comp_year'+respro_row+'" class="form-control month_yr_pk" readonly value="" required=""></td><td><input type="text" name="res_pro['+respro_row+'][outcome]" id="res_pro_outcome'+respro_row+'" class="form-control" value="" required=""></td><td> <button type="button" data-rowid="respro_row_'+respro_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		respro_row++;
		set_no(sno);
    });

	jQuery('#doc_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=10)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		var option = get_option(polar);
		jQuery('#doc_tbe').append('<tr class="doc_row_'+doc_row+'"> <td class="doc_sno"></td><td><input type="text" name="doctoral['+doc_row+'][institution]" id="doc_institution_'+doc_row+'" class="form-control" value="" required=""/></td><td><input type="text" name="doctoral['+doc_row+'][scholar]" id="doc_scholar_'+doc_row+'" class="form-control" value="" required=""/></td><td><input type="text" name="doctoral['+doc_row+'][year]" id="doc_year_'+doc_row+'" class="form-control numberonly" maxlength="4" minlength="4" value="" required=""/></td><td><input type="text" name="doctoral['+doc_row+'][topic]" id="doc_topic_'+doc_row+'" class="form-control" value="" required=""/></td><td><input type="text" name="doctoral['+doc_row+'][role]" id="doc_role_'+doc_row+'" class="form-control" value="" required=""/></td><td><select name="doctoral['+doc_row+'][awarded]" id="doc_awarded_'+doc_row+'" class="form-control" required="">'+option+'</select></td><td> <button type="button" data-rowid="doc_row_'+doc_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		doc_row++;
		set_no(sno);
    });
	
	jQuery('#eepco_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=10)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#eepco_tbe').append('<tr class="eepco_row_'+eepco_row+'"> <td class="eep_sno" ></td><td><input type="text" name="eep_conduct['+eepco_row+'][title]" id="eepco_title_'+eepco_row+'" class="form-control" value="" required=""></td><td><input type="text" name="eep_conduct['+eepco_row+'][sponsor]" id="eepco_sponsor_'+eepco_row+'" class="form-control" value="" required=""></td><td><input type="text" name="eep_conduct['+eepco_row+'][place]" id="eepco_place_'+eepco_row+'" class="form-control" value="" required=""></td><td><input type="text" name="eep_conduct['+eepco_row+'][from]" id="eepco_from_'+eepco_row+'" class="form-control info_duration" readonly="" value="" required=""></td><td><input type="text" name="eep_conduct['+eepco_row+'][to]" id="eepco_to_'+eepco_row+'" class="form-control info_duration" readonly="" value="" required=""></td><td> <button type="button" data-rowid="eepco_row_'+eepco_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		eepco_row++;
		set_no(sno);
    });

	jQuery('#eepse_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=15)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#eepse_tbe').append('<tr class="eepse_row_'+eepse_row+'"> <td class="eepse_sno" ></td><td><input type="text" name="eep_session['+eepse_row+'][title]" id="eepse_title_'+eepse_row+'" class="form-control" value="" required=""></td><td><input type="text" name="eep_session['+eepse_row+'][session]" id="eepse_sponsor_'+eepse_row+'" class="form-control" value="" required=""></td><td><input type="text" name="eep_session['+eepse_row+'][place]" id="eepse_place_'+eepse_row+'" class="form-control" value="" required=""></td><td><input type="text" name="eep_session['+eepse_row+'][date]" id="eepse_date_'+eepse_row+'" class="form-control info_duration" readonly="" value="" required=""></td><td> <button type="button" data-rowid="eepse_row_'+eepse_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		eepse_row++;
		set_no(sno);
    });

	jQuery('#admexp_add').on('click',function(){
		that = jQuery(this);
		sno = that.data('sno');
	    var max = max_count(sno);
		if(max>=max_row)
		{
			swal('warning',"You can't add more rows");
            return "";
		}
		jQuery('#admin_exp_tbe').append('<tr class="admexp_row_'+admexp_row+'"> <td class="adm_sno" ></td><td><input type="text" name="admin_exp['+admexp_row+'][institution]" id="admexp_institution_'+admexp_row+'" class="form-control" value="" required=""></td><td><input type="text" name="admin_exp['+admexp_row+'][position]" id="admexp_position_'+admexp_row+'" class="form-control" value="" required=""></td><td><input type="text" name="admin_exp['+admexp_row+'][from]" id="admexp_from_'+admexp_row+'" class="form-control month_yr_pk" readonly="" value="" required=""></td><td><input type="text" name="admin_exp['+admexp_row+'][to]" id="admexp_to_'+admexp_row+'" class="form-control month_yr_pk" readonly="" value="" required=""></td><td><input type="text" name="admin_exp['+admexp_row+'][responsibility]" id="admexp_respon_'+admexp_row+'" class="form-control" value="" required=""></td><td> <button type="button" data-rowid="admexp_row_'+admexp_row+'" class="btn btn-danger remove-row"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		admexp_row++;
		set_no(sno);
    });

	jQuery('#pref_add').on('click',function(){
		var s_no = Number(pref_row)+1;
		jQuery('#pref_tbe').append('<tr class="pref_row_'+pref_row+'"> <td>'+s_no+'</td><td><input type="text" name="prof_refer['+pref_row+'][name]" id="name_'+pref_row+'" class="form-control" value="" required=""></td><td><input type="text" name="prof_refer['+pref_row+'][designation]" id="prof_designation_'+pref_row+'" class="form-control" value="" required=""></td><td><input type="text" name="prof_refer['+pref_row+'][affiliation]" id="affiliation_'+pref_row+'" class="form-control" value="" required=""></td><td><input type="email" name="prof_refer['+pref_row+'][email]" id="email_'+pref_row+'" class="form-control" value="" required=""></td><td><input type="text" name="prof_refer['+pref_row+'][mobile]" id="mobile_'+pref_row+'" class="form-control" value="" required=""></td><td> <button type="button" data-rowid="pref_row_'+pref_row+'" class="btn btn-danger btn-remove-course-exp"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> </td></tr>');
		pref_row++;
    });
		

     function remove_row(row_cls,that)
	 {
		swal({
			title: "Are you sure?",
			text: "After delete row you will not be able to recover!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#5cb85c",
			confirmButtonText: "Yes, I am sure!",
			cancelButtonText: "No, cancel",
			closeOnConfirm: false,
			closeOnCancel: true
		  },
		  function(isConfirm){
			  if(isConfirm) {
				  jQuery(".sweet-alert").addClass("hideSweetAlert");
				  jQuery("body").removeClass(" stop-scrolling");
				  jQuery(".sweet-overlay").hide();
				  jQuery(".sweet-alert").hide();

				  var table = that.closest('table').attr('id');
				  jQuery(row_cls).remove();

				  var sno = jQuery('#'+table).data('sno');
				  set_no(sno);

			  }  // confirm
		  }); // end swal
	 }

	jQuery(document).on('click','.btn-remove-cor-exp,.remove-case-std,.remove-row',function(){
		var that = jQuery(this);
		var row_id = that.data('rowid');
		remove_row('.'+row_id,that);
	  });
	  jQuery(document).on('keyup input','.check_nature',function(){
		  var current = jQuery(this).val().trim();
		  var fullid = jQuery(this).data('id');
		  ids = fullid.split("_");
		  id = ids[1];

		  if(ids[0]=='adc')
		  {
			if(current!="")
			{
				jQuery("#organization_"+id).attr("required","required");
				jQuery("#designation_"+id).attr("required","required");
				jQuery("#info_date_of_joining_"+fullid).attr("required","required");
				jQuery("#info_release_date_"+fullid).attr("required","required");
				jQuery("#nature_"+fullid).attr("required","required");
  
				jQuery("#hid_academic_document_"+id).attr("required","required");
  
			}else
			{
			  jQuery("#organization_"+id).removeAttr("required","required");
			  jQuery("#designation_"+id).removeAttr("required","required");
			  jQuery("#info_date_of_joining_"+fullid).removeAttr("required","required");
			  jQuery("#info_release_date_"+fullid).removeAttr("required","required");
			  jQuery("#nature_"+fullid).removeAttr("required","required");
			  jQuery("#hid_academic_document_"+id).removeAttr("required","required");
  
			  jQuery("#organization_"+id+"-error").hide();
			  jQuery("#designation_"+id+"-error").hide();
			  jQuery("#info_date_of_joining_"+fullid+"-error").hide();
			  jQuery("#info_release_date_"+fullid+"-error").hide();
			  jQuery("#nature_"+fullid+"-error").hide();
			  jQuery("#hid_academic_document_"+id+"-error").hide();
			}
		  }else
		  {
			if(current!="")
			{
				jQuery("#organization_"+fullid).attr("required","required");
				jQuery("#designation_"+fullid).attr("required","required");
				jQuery("#info_date_of_joining_"+fullid).attr("required","required");
				jQuery("#info_release_date_"+fullid).attr("required","required");
				jQuery("#nature_"+fullid).attr("required","required");
  
				jQuery("#hid_industry_document_"+id).attr("required","required");
			}else
			{
			  jQuery("#organization_"+fullid).removeAttr("required","required");
			  jQuery("#designation_"+fullid).removeAttr("required","required");
			  jQuery("#info_date_of_joining_"+fullid).removeAttr("required","required");
			  jQuery("#info_release_date_"+fullid).removeAttr("required","required");
			  jQuery("#nature_"+fullid).removeAttr("required","required");
			  jQuery("#hid_industry_document_"+id).removeAttr("required","required");
  
			  jQuery("#organization_"+fullid+"-error").hide();
			  jQuery("#designation_"+fullid+"-error").hide();
			  jQuery("#info_date_of_joining_"+fullid+"-error").hide();
			  jQuery("#info_release_date_"+fullid+"-error").hide();
			  jQuery("#nature_"+fullid+"-error").hide();
			  jQuery("#hid_industry_document_"+id+"-error").hide();
			}
		  }

	});


	}); // end of on ready 