[[U8:text/javascript]]

/* 2014 Greensward scripts - based on Donation form scripts - v5 - 20 Nov 2014 */
var addlErrorText = '<span class="error addl-error-text">You may also contact us at 212-310-6693 for assistance from 9:00 am to 5:00 pm, Monday through Friday.</span>';

String.prototype.contains = function(contains) {
    return this.indexOf(contains) != -1 ? true : false;
};

jQuery.fn.center = function () {
    this.parent().css({
    	'z-index': '100000',
    	'position': 'fixed',
    	'top': '0',
    	'left': '0',
    	'width': $(window).width(),
    	'height': $(window).height(),
    	'opacity': '0.75'
    }).show();

    this.css("position","absolute");
    this.css("top", "50%");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}; 

jQuery.fn.numericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

function numbersOnly(e,decimal){
	var key;
	var keychar;
	if(window.event)
	   key=window.event.keyCode;
	else if(e)
	   key=e.which;
	else
	   return true;
	keychar=String.fromCharCode(key);
	if((key==null)||(key==0)||(key==8)||(key==9)||(key==13)||(key==27))
	   return true;
	else if((("0123456789").indexOf(keychar)>-1))
	   return true;
	else if(decimal&&(keychar==".")) 
	  return true;
	else
	   return false;
}

/* function to validate the form and submit the data for processing via AJAX */
function processDonationForm() {
	/*if ($('#anonymousDonation').prop('checked')=='true') {
		$('#annualReportName').val('');
	}*/
	if ( $('#donation_form_id').valid() ) {
		$('#btnSubmit').attr('disabled','disabled').css('opacity','0.5');
		$('#memLoader img').center();
		$('#ccApiErrors').hide();
		$.ajax({
			type		: 'post',
			data		: $('#donation_form_id').serialize(),
			url			: '[[S551:CRDonationAPI]]',
			success		: function(response) {
				$('#btnSubmit').removeAttr('disabled').css('opacity','1');
				$('#memLoader').hide();
				window.location = '[[S6]]?pagename=greensward_thanks';
				//window.location = 'https://secure2.convio.net/cpc/site/SPageNavigator/donate_thanks.html';
			},
			error		: function(response) {
				$('#btnSubmit').removeAttr('disabled').css('opacity','1');
				$('#memLoader').hide();
				var errorMessage = '';
				if ($(response.responseText).find('fieldError').length > 0 && $(response.responseText).find('fieldError').html() != '') {
					errorMessage = $(response.responseText).find('fieldError').html()+addlErrorText;
				} else if ($(response.responseText).find('pageError').length > 0 && $(response.responseText).find('pageError').html() != '') {
					errorMessage = $(response.responseText).find('pageError').html()+addlErrorText;
				} else {
					errorMessage = 'An unexpected error occurred.'+addlErrorText;
				}
				$('#ccApiErrors').show().html(errorMessage);
			}
		});
	} else {
		window.scrollBy(0,-50);
	}
};

/* onload */
(function($) {
	$(function() {
	
		//show the "selected" State when clicking on a donation amount
		$('.level').not('.hl-btn').click(function(e){
			$('.level').removeClass('level_selected');
			$(this).addClass('level_selected');
			var benefits = '#' + $(this).find('input[type="radio"]:checked').val();
			$('.level-description > div').hide();
			$(benefits).show();
			e.stopPropagation();
		});

		//show or hide spouse/partner fields
		$('#addSecondPerson').change(function(){
			if($(this).prop('checked') == true){
				$('.partner').show();
			}else{
				$('.partner').hide();
			}
		});
		
		/* static and some dynamic validation rules for the donation form
		   only handling front-end validation, no back-end validation such as credit card authorization */
		$('#donation_form_id').validate({
			rules: {
				'level_id'					: 'required',
				'billing.name.first'		: { 'required' : true, 'maxlength' : 50 },
				'billing.name.last'			: { 'required' : true, 'maxlength' : 50 },
				'billing.address.street1'	: { 'required' : true, 'maxlength' : 50 },
				'billing.address.street2'	: { 'maxlength' : 50 },
				'billing.address.city'		: { 'required' : true, 'maxlength' : 50 },
				'billing.address.state'		: 'required',
				'billing.address.zip'		: 'required',
				'donor.email'				: { 'required': true, 'email': true, 'maxlength' : 50 },
				'card_number'				: 'required',
				'card_cvv'					: 'required',
				'card_exp_date_month'		: 'required',
				'card_exp_date_year'		: 'required'
			},
			messages: {
				'level_id'					: '* required',
				'billing.name.title'		: '* required',
				'billing.name.first'		:  { 'required':	'* required',
												'maxlength':	'* maximum length 50 characters' },
				'billing.name.last'			: { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'billing.address.street1'	: { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'billing.address.street2'	: { 'maxlength':	'* maximum length 50 characters' },
				'billing.address.city'		: { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'billing.address.state'		: '* required',
				'billing.address.zip'		: '* required',
				'donor.email'				: { required: '* required', email: '* please enter a valid email', 'maxlength':	'* maximum length 50 characters' },
				'card_number'				: '* required',
				'card_cvv'					: '* required',
				'card_exp_date_month'		: '* required',
				'card_exp_date_year'		: '* required'
			}
		});

		$('#cardNumber').numericOnly();
		
		/* handle mousover and click events for donation amount (name=level_id) radio buttons */
		$('#memDonWrap #amountWrap ul.levels li').mouseover(function(e) {
			if ($(this).find('input').length > 0) {
				var index = $(this).find('input').attr('id').split('_')[2];
				$('.giftBenefits').hide();
				$('#benefits_'+index).show();
			}
		}).mouseout(function(e) {
			var index = $('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2];
			$('.giftBenefits').hide();
			$('#benefits_'+index).show();
		});
		
		/*$('#anonymousDonation').click(function(){
			if ($(this).attr('checked') == 'checked') {
				$('#annualReportNameArea').hide();
			} else {
				$('#annualReportNameArea').show();
			}
		});*/

		/*
		$('[id^=level_id_]').click(function(){
			var id = $(this).attr('id').substring(9,10);
			var amt = [35,50,100,250,500,1000];
			if (id == 6) {
				$('#donAmt').text($('#other_amount').val());
				$('#other_amount').focus();
			} else {
				$('#donAmt').text(amt[id]);
			}
		});*/
		
		/* fades in/out credit card logos based on credit card type
		   credit card type is identified in the keyup event for the credit card field */
		function swapLogos( selector ) {
			$('#visa_logo, #mc_logo, #amx_logo')
				.stop()
				.animate({ 'opacity': 0.2 }, 1000);
			if ( selector != '' ) {
				$(selector)
					.stop()
					.animate({ 'opacity': 0.9 }, 1000);
			}
		};

		/* identify credit card number as user types and set the corresponding logo */
		$('#card_number').keyup(function(e) {
			var num = $(this).val();
			swapLogos('');
			if ( num.substring(0,1) == '4' && (num.length == '13' || num.length == '16') ) {
				swapLogos('#visa_logo');
			} else if ( num.substring(0,2) >= '51' && num.substring(0,2) <= '55' && num.length == '16' ) {
				swapLogos('#mc_logo');
			} else if ( (num.substring(0,2) == '34' || num.substring(0,2) == '37') && num.length == '15' ) {
				swapLogos('#amx_logo');
			}
		});
		
		/* STARTUP */
				
		/* override the HTML form submission so the user remains on the page while the AJAX processing can occur */
		$('#donation_form_id').submit(function() {
			processDonationForm();
			return false;
		});
		
		Shadowbox.init({ skipSetup: true });
		
		$('#donation_form_id').attr('action', 'javascript:void(0);');
		
		/* Initialize rules and values on page load */
		//$('ul.levels input:checked').click();
		$('ul.levels input:checked').mouseover().mouseout(); //change to this as the click handler wasn't behaving with code edits
		[[?xxnullx::x[[S334:levelID]]x::::
			$('ul.levels input[value="[[S334:levelID]]"]').click();
		]]
		
	});
	
})(jQuery);