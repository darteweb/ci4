// JavaScript Document

$.noConflict();



jQuery(function () {

  jQuery('[data-toggle="tooltip"]').tooltip()

})

function myFunction() {

    window.print();

}

 jQuery(function() {

    jQuery( "#loginDatepicker,#dob" ).datepicker({

      changeMonth: true,

      changeYear: true,

	  dateFormat: 'dd-mm-yy',

	  yearRange: "1960:2025",

	  onSelect: function (dateText, inst) {

		  jQuery('#dob-error').hide();

		  jQuery('#loginDatepicker-error').hide();

	  }

    });


	

	jQuery("#loginForm").validate({

  rules: {

    field: {

      required: true,

      date: true

    }

  }

});


	jQuery(document).on('keyup','.small',function(){

		var sml = jQuery(this).val().toLowerCase();

		jQuery(this).val(sml);

	});	
	
	jQuery.fn.capitalize = function() {
		jQuery(this).keyup(function(event) {
			var box = event.target;
			var txt = jQuery(this).val();
			var stringStart = box.selectionStart;
			var stringEnd = box.selectionEnd;
			jQuery(this).val(txt.replace(/^(.)|(\s|\-)(.)/g, function($word) {
				return $word.toUpperCase();
			}));
			box.setSelectionRange(stringStart , stringEnd);
		});
	
	   return this;
	}

	jQuery('.capital').capitalize();

	jQuery(document).on('keydown input',".numberonly", function (e) {
		this.value = this.value.replace(/[^0-9]/gi,'');
	});

	jQuery(document).on('keydown input',".numdeconly", function (e) {
		this.value = this.value.replace(/[^0-9\.]/gi,'');
	});

	jQuery(document).on('keydown input',".numdashonly", function (e) {
		this.value = this.value.replace(/[^0-9\-]/gi,'');
	});
	
	jQuery(document).on('keydown input',".textnumonly", function (e) {
		this.value = this.value.replace(/[^a-z0-9 ]/gi,'');
    });

	jQuery(document).on('keydown input',".textonly", function (e) {
		this.value = this.value.replace(/[^a-z ]/gi,'');
    });

	jQuery(document).on('keydown input',".textdotonly", function (e) {
		this.value = this.value.replace(/[^a-z\. ]/gi,'');
    });

	jQuery(document).on('keydown input',".landlineonly", function (e) {
		this.value = this.value.replace(/[^0-9\+\- ]/gi,'');
    });	

});