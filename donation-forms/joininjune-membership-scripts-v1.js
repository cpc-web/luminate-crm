/* JiJ Membership Scripts - v1 - 28 May 2014 - derived from Membership Scripts v33*/
var formIndividual = '3580';
var formFamily = '3582';
var formGreen = '3600';
var formGift = '3601';
var formRenew = '1460';

var isFamily = false;
var presetType = 'false';

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
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}; 

function setPremium() {
	
	if ($('#familyBenefits').is(':checked')) {
		var premiumArray = [0,0,6685,6686,0,6687,0,6689,6690,6691,6692,6693]; //family premium ID's
	}
	else {
		var premiumArray = [0,0,0,0,6641,6601,6661,6621,6642,6643,6644,6645]; //individual ID's
	}

	var radioButtons = $('ul.levels input[name="level_id"]');
	var radioIndex = radioButtons.index(radioButtons.filter(':checked'));
	var premiumID = 0;

	if ($('#premiumDeclined').is(':not(:checked)')) {
		premiumID = premiumArray[radioIndex];
	}

	$('#premium_id').val(premiumID);
}

/* function to validate the form and submit the data for processing via AJAX */
function processDonationForm() {

	setPremium();
	checkAskResponse();
	$('#honoreeEmail').val($('#ecardRecipients').val());
	if ($('#anonymousDonation').attr('checked')=='checked') {
		$('#annualReportName').val('');
	}
	if ( $('#donation_form_id').valid() ) {
		$('#btnSubmit').attr('disabled','disabled').css('opacity','0.5');
		$('#memLoader img').center();
		$('#ccApiErrors').hide();
		if ($('#ecardSubject').val().length > 255) {
			$('#ecardSubject').removeClass('valid').addClass('error');
			return false;
		}
		if ($('#ecardMessage').val().length > 255) {
			$('#ecardMessage').removeClass('valid').addClass('error');
			return false;
		}
		if ($('#formID').val() != '3601') {
			$('#additionalPerson').remove();
			$('#giftRecipientFullName').remove();
		} else {
			$('#giftRecipientFullName').val($('#jointDonorNameFirst').val()+' '+$('#jointDonorNameLast').val());
		}
		$.ajax({
			type		: 'post',
			data		: $('#donation_form_id').serialize(),
			url			: 'https://secure2.convio.net/cpc/site/CRDonationAPI',
			success		: function(response) {
				$('#btnSubmit').removeAttr('disabled').css('opacity','1');
				$('#memLoader').hide();
				window.location = 'https://secure2.convio.net/cpc/site/SPageServer?pagename=membership_thanks';
			},
			error		: function(response) {
				$('#btnSubmit').removeAttr('disabled').css('opacity','1');
				$('#memLoader').hide();
				$('#askInput').remove();
				if ($(response.responseText).find('fieldError').length > 0 && $(response.responseText).find('fieldError').html() != '') {
					$('#ccApiErrors').show().html($(response.responseText).find('fieldError').html());
				} else {
					$('#ccApiErrors').show().html($(response.responseText).find('pageError').html());
				}
			}
		});
	} else {
		window.scrollBy(0,-50);
	}
	if ($('#ecardSubject').val().length > 255) {
		$('#ecardSubject').removeClass('valid').addClass('error');
		if ($('#ecardSubject').parent().find('label.error').length <= 0) {
			$('<label class="error" for="ecardSubject" generated="true" style="display: block;">Please enter no more than 50 characters.</label>').appendTo($('#ecardMessage').parent());
		} else if ($('#ecardSubject').parent().find('label.error').css('display') == 'none') {
			$('#ecardsubject').parent().find('label.error').css('display','');
		}
	}
	if ($('#ecardMessage').val().length > 255) {
		$('#ecardMessage').removeClass('valid').addClass('error');
		if ($('#ecardMessage').parent().find('label.error').length <= 0) {
			$('<label class="error" for="ecardMessage" generated="true" style="display: block;">Please enter no more than 255 characters.</label>').appendTo($('#ecardMessage').parent());
		} else if ($('#ecardMessage').parent().find('label.error').css('display') == 'none') {
			$('#ecardMessage').parent().find('label.error').css('display','');
		}
	}
};

function enablePerksIcons(elements) {
	$.each(elements, function(){
		$(this).attr('src',$(this).attr('src').replace('_off.jpg','.jpg'));
	});
}

function giftBenefitsIconsUpdate(index) {
	$('img.benefitsIcon').each(function(){
		if ($(this).attr('src').indexOf('_off.jpg') == -1) {
			$(this).attr('src',$(this).attr('src').replace('.jpg','_off.jpg'));
		}
	});
	if (index=='0'){
		enablePerksIcons($('img.benefitsIcon:lt(6)'));
		$('#taxAmt').text('100%');
	} else if (index=='1'){
		enablePerksIcons($('img.benefitsIcon:lt(7)'));
		$('#taxAmt').text('100%');
	} else if (index=='2'){
		enablePerksIcons($('img.benefitsIcon:lt(7)').add('img.benefitsIcon:eq(10)'));
		$('#taxAmt').text('100%');
	} else if (index=='3'){
		enablePerksIcons($('img.benefitsIcon:lt(7)').add('img.benefitsIcon:eq(8)'));
		$('#taxAmt').text('100%');
	} else if (index=='4'){
		enablePerksIcons($('img.benefitsIcon:lt(2)').add('img.benefitsIcon:eq(5)').add('img.benefitsIcon:eq(7)').add('img.benefitsIcon:eq(8)').add('img.benefitsIcon:eq(10)'));
		$('#taxAmt').text('$250');
	} else if (index=='5'){
		enablePerksIcons($('img.benefitsIcon:lt(10)'));
		$('#taxAmt').text('$485');
	} else if (index=='6'){
	 enablePerksIcons($('img.benefitsIcon:lt(2)').add('img.benefitsIcon:eq(5)').add('img.benefitsIcon:eq(7)').add('img.benefitsIcon:eq(8)').add('img.benefitsIcon:eq(10)'));
	 $('#taxAmt').text('$400');
	} else if (index=='7'){
		enablePerksIcons($('img.benefitsIcon:lt(12)'));
		$('#taxAmt').text('$961');
	} else if (index=='8'){
		enablePerksIcons($('img.benefitsIcon:lt(14)'));
		$('#taxAmt').text('$2,425');
	} else if (index=='9'){
		enablePerksIcons($('img.benefitsIcon:lt(14)'));
		$('#taxAmt').text('$4,875');
	} else if (index=='10'){
		enablePerksIcons($('img.benefitsIcon:lt(15)'));
		$('#taxAmt').text('$9,875');
	} else if (index=='11'){
		enablePerksIcons($('img.benefitsIcon:lt(15)'));
		$('#taxAmt').text('100%');
	}
	if($('#premiumDeclined').attr('checked')=='checked' && $('#giftMembership').attr('checked')!='checked') {
		$('#taxAmt').text('100%');
	}
}

function setSecondPersonOrGift() {
	if ($('#giftMembership').attr('checked')=='checked') {
		$('.secondPerson').html('Gift Recipient');
		$('#addSecondPerson').attr('checked','checked');
		$('#addSecondPerson').attr('disabled', 'disabled');
		$('#jointDonorNameFirst').attr('name','gift_recipient_first_name');
		$('#jointDonorNameLast').attr('name','gift_recipient_last_name');
		$('#jointDonorEmailArea').hide();
		$('.jointDonor').removeClass('disabled');
		$('.jointDonor input').removeAttr('disabled');
		$('#memDonWrap #additionalPerson').show();
	} else if ($('#level_id_2').attr('checked')=='checked' || $('#level_id_6').attr('checked')=='checked' || $('#familyBenefits').attr('checked')=='checked') {
		$('.secondPerson').html('Add a Spouse/Partner Name');
		$('#addSecondPerson').attr('checked','checked');
		$('#addSecondPerson').removeAttr('disabled');
		$('#jointDonorNameFirst').attr('name','additional_member_first_name');
		$('#jointDonorNameLast').attr('name','additional_member_last_name');
		$('#jointDonorEmailArea').show();
		$('.jointDonor').removeClass('disabled');
		$('.jointDonor input').removeAttr('disabled');
		$('#memDonWrap #additionalPerson').hide();
	} else if ($('#level_id_4').attr('checked')=='checked') {
		$('#addSecondPerson').attr('disabled', 'disabled');
		$('#addSecondPerson').removeAttr('checked');
		$('.jointDonor').addClass('disabled');
		$('.jointDonor input').attr('disabled','disabled');
	} else {
		if ($('#addSecondPerson').attr('checked') != 'checked') {
			$('.jointDonor').addClass('disabled');
			$('.jointDonor input').attr('disabled','disabled');
		} else {
			if ($('#jointDonorNameFirst').val()=='' && $('#jointDonorNameLast').val()=='' && $('#jointDonorEmail').val()==''){
				$('#addSecondPerson').removeAttr('checked');
				$('.jointDonor').addClass('disabled');
				$('.jointDonor input').attr('disabled','disabled');
			}
		}
		$('.secondPerson').html('Add a Spouse/Partner Name');
		$('#addSecondPerson').removeAttr('disabled');
		$('#additionalPerson').hide();
		$('#jointDonorNameFirst').attr('name','additional_member_first_name');
		$('#jointDonorNameLast').attr('name','additional_member_last_name');
	}
}

function changeForms(formID) {
	if (!formID || formID==='') {
		formID = formIndividual;
	}
	$('#formID').val(formID);
	if (formID==formFamily) {
		if ($('#memDonWrap #familyArea').hasClass('disabled') || $('#memDonWrap #amountWrap ul.levels input:checked').attr('id')=='level_id_2' || isFamily) {
			$('#memDonWrap #familyArea').removeClass('disabled');
			$('#memDonWrap #familyBenefits').removeAttr('disabled');
			$('#memDonWrap #familyBenefits').attr('checked','checked');
			$('#memDonWrap #familyWarning').show();
			$('#memDonWrap #greenswardArea').addClass('disabled');
			$('#memDonWrap #greenswardCircle').removeAttr('checked');
			$('#memDonWrap #greenswardWarning').hide();
			$('#memDonWrap #greenswardCircle').attr('disabled','disabled');
		}
		
		$('#memDonWrap #amountWrap ul.levels li:not(".higherLevel")').hide();
		$('#memDonWrap #amountWrap ul.levels li').removeClass('disabled').find('input').removeAttr('disabled');
		$('#memDonWrap #amountWrap ul.levels li.individual:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.family:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.toggle').show();
		$('#level_id_0').parent().parent().addClass('disabled');
		$('#level_id_1').parent().parent().addClass('disabled');
		if ($('#giftMembership').attr('checked')!='checked') {
			$('#autoRenewArea').show();
			$('#declineGifts').show();
			$('#memDonWrap #eCardSection').hide();
		}
	} else if (formID==formGreen) {
		$('#memDonWrap #familyArea').addClass('disabled');
		$('#memDonWrap #familyBenefits').attr('disabled','disabled');
		
		$('#memDonWrap #amountWrap ul.levels li').not('.greensward').not('.higherLevel').not('.above1000').show().addClass('disabled').find('input');
		$('#memDonWrap #amountWrap ul.levels li.individual.family.gift.renewal').not('.higherLevel').not('.above1000').hide();
		$('#memDonWrap #amountWrap ul.levels li.greensward:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.toggle').show();
		if (!$('#memDonWrap #amountWrap ul.levels input:checked').parent().parent().hasClass('greensward')) {
			$('#memDonWrap #amountWrap ul.levels li.greensward:eq(0)').find('input').attr('checked','checked');
		}
		if ($('#giftMembership').attr('checked')!='checked') {
			$('#autoRenewArea').show();
			$('#declineGifts').show();
			$('#memDonWrap #eCardSection').hide();
		}
	} else if (formID==formGift) {
		$('#memDonWrap #eCardSection').show();
		$('#autoRenewArea').hide();
		$('#declineGifts').hide();
	} else {
		$('#memDonWrap #amountWrap ul.levels li:not(".higherLevel")').hide();
		$('#memDonWrap #amountWrap ul.levels li').removeClass('disabled').find('input').removeAttr('disabled');
		$('#memDonWrap #amountWrap ul.levels li.individual:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.family:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.toggle').show();
		if (!$('#memDonWrap #amountWrap ul.levels input:checked').parent().parent().hasClass('individual')) {
			$('#memDonWrap #amountWrap ul.levels li.individual:eq(1) input').attr('checked','checked');
		}
		$('#memDonWrap #familyArea').removeClass('disabled');
		$('#memDonWrap #familyBenefits').removeAttr('disabled');
		if ($('#level_id_0').attr('checked')=='checked' || $('#level_id_1').attr('checked')=='checked' || !isFamily) {
			$('#memDonWrap #familyBenefits').removeAttr('checked');
			$('#memDonWrap #familyWarning').hide();
		}
		$('#memDonWrap #greenswardArea').removeClass('disabled');
		$('#memDonWrap #greenswardCircle').removeAttr('disabled');
		$('#memDonWrap #greenswardCircle').removeAttr('checked');
			$('#memDonWrap #greenswardWarning').hide();
		
		if ($('#giftMembership').attr('checked')!='checked') {
			$('#autoRenewArea').show();
			$('#declineGifts').show();
			$('#memDonWrap #eCardSection').hide();
		}
	}
	setDonAmt($('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2]);
}

function changeLevels(formID){
	if (!formID || formID==='') {
		formID = formIndividual;
	}
	if (formID==formFamily) {
		$('#level_id_2').val('4854');
		$('#level_id_3').val('4860');
		$('#level_id_5').val('4856');
		$('#level_id_7').val('4853');
		$('#level_id_8').val('4859');
		$('#level_id_9').val('4852');
		$('#level_id_10').val('4857');
		$('#level_id_11').val('4861');
	} else if (formID==formGreen) {
		$('#level_id_4').val('4883');
		$('#level_id_6').val('4888');
		$('#level_id_7').val('4885');
		$('#level_id_8').val('4887');
		$('#level_id_9').val('4890');
		$('#level_id_10').val('4886');
		$('#level_id_11').val('4882');
	} else if (formID==formGift) {
		$('#level_id_0').val('4891');
		$('#level_id_1').val('4901');
		$('#level_id_2').val('4899');
		$('#level_id_3').val('4893');
		$('#level_id_4').val('4981');
		$('#level_id_5').val('4898');
		$('#level_id_6').val('4982');
		$('#level_id_7').val('4895');
		$('#level_id_8').val('4897');
		$('#level_id_9').val('4900');
		$('#level_id_10').val('4896');
		$('#level_id_11').val('4892');
	} else {
		$('#jointDonorNameFirst').attr('name','additional_member_first_name');
		$('#jointDonorNameLast').attr('name','additional_member_last_name');
		$('#jointDonorEmailArea').show();
		$('#memDonWrap #additionalPerson').hide();
		$('#level_id_0').val('4842');
		$('#level_id_1').val('4843');
		$('#level_id_3').val('4844');
		$('#level_id_5').val('4845');
		$('#level_id_7').val('4846');
		$('#level_id_8').val('4847');
		$('#level_id_9').val('4848');
		$('#level_id_10').val('4849');
		$('#level_id_11').val('4850');
	}
}

function setDonAmt(id) {
	var amt = [50,100,125,250,300,500,500,1000,2500,5000,10000,25000];
	$('#donAmt').text(amt[id]);
}

//functions for setting attributes based on gift type selection
function setFamily() {
	isFamily = true;
	$('#memDonWrap #familyWarning').show();
	if ($('#level_id_0').attr('checked')=='checked' || $('#level_id_1').attr('checked')=='checked') {
		$('#level_id_2').attr('checked','checked');
		setDonAmt(2);
	}
	if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
		changeForms(formFamily);
		changeLevels(formFamily);
	}
}

function setGreensward() {
	$('#memDonWrap #greenswardWarning').show();
	if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
		changeForms(formGreen);
		changeLevels(formGreen);
	}
}

function setGift() {
	changeForms(formGift);
	changeLevels(formGift);
}

function setType() {
	setSecondPersonOrGift();
	var index = $('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2];
	if (presetType != 'gfm'){
		var formID = $('#formID').val();
		//alert('form id: '+formID);
		if (formID == formFamily) {
			$('.giftBenefits').hide();
			$('#benefits_2').show();
		} else if (formID == formGreen) {
			$('.giftBenefits').hide();
			$('#benefits_4').show();
		} else if ($('#level_id_0').attr('checked')=='checked') {
			$('.giftBenefits').hide();
			$('#benefits_0').show();
		} else {
			$('.giftBenefits').hide();
			$('#benefits_1').show();
		}
	}
	giftBenefitsIconsUpdate(index);
}

function checkAskResponse() {
	var formID = $('#formID').val();
	if ($('#level_id_0').attr('checked')!='checked') {
		var randomAsk = $('#randomAsk').text();
		if (formID == formFamily) { 
			randomAsk += '_family';
		} else if (formID == formGreen) { 
			randomAsk += '_green';
		}
		var askInput = '<input name="ask_response" id="askInput" type="hidden" value="'+randomAsk+'" />';
		$('#donation_form_id').append(askInput);
	}
}

/* onload */
(function($) {
	$(function() {
	
		presetType = [[?x[[S334:type]]x::xx::'none'::'[[S334:type]]']];
		
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
				'card_exp_date_year'		: 'required',
				'additional_member_first_name'	: { 'required': { depends	: function(el) { return $('#addSecondPerson').is(':checked'); }},
												'maxlength' : 50
												},
				'additional_member_last_name'		: { 'required': { depends	: function(el) { return $('#addSecondPerson').is(':checked'); }},
												'maxlength' : 50
												},
				'joint_donor_email'			: { 'required': { depends	: function(el) { return ($('#addSecondPerson').is(':checked') && (!$('#giftMembership').is(':checked'))); }},
												'email': true,
												'maxlength' : 50
												},
				'tribute.honoree.name.first': { 'required': { depends	: function(el) { return $('#giftMembership').is(':checked'); }},
												'maxlength' : 50
												},
				'tribute.honoree.name.last'	: { 'required': { depends	: function(el) { return $('#giftMembership').is(':checked'); }},
												'maxlength' : 50
												},
				'tribute.notify.address.street1' : { 'required': { depends	: function(el) { return $('#giftMembership').is(':checked'); }}
												},
				'tribute.notify.address.city' : { 'required': { depends	: function(el) { return $('#giftMembership').is(':checked'); }}
												},
				'tribute.notify.address.state' : { 'required': { depends	: function(el) { return $('#giftMembership').is(':checked'); }}
												},
				'tribute.notify.address.zip' : { 'required': { depends	: function(el) { return $('#giftMembership').is(':checked'); }}
												}
			},
			messages: {
				'level_id'					: '* required',
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
				'card_exp_date_year'		: '* required',
				'additional_member_first_name'	: { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'additional_member_last_name'		: { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'joint_donor_email'			: { required: '* required', email: '* please enter a valid email', 'maxlength':	'* maximum length 50 characters' },
				'tribute.honoree.name.first': { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'tribute.honoree.name.last'	: { 'required':		'* required',
												'maxlength':	'* maximum length 50 characters' },
				'tribute.notify.address.street1' : '* required',
				'tribute.notify.address.city' : '* required',
				'tribute.notify.address.state' : '* required',
				'tribute.notify.address.zip' : '* required'
			}
		});
		
		// Toggle the higher levels
		$('li.toggle a.toggleLevels').click(function(){
			if ($(this).html().indexOf('See Higher Levels') != -1) {
				$(this).html('(Hide Higher Levels)');
				$('li.higherLevel').show();
			} else {
				$(this).html('(See Higher Levels)');
				$('li.higherLevel').hide();
			}
		});
		
		// Mouseover for perks area to display perks info as popup
		$('.benefitsIcon').mouseover(function(){
			var index = parseInt($('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2],10);
			if ($(this).attr('src').indexOf('_off.jpg') == -1) {
				$('#perksInfo').show();
				var perkSelector = '#perks_'+$('#benefitsIcons img').index(this);
				$(perkSelector).show();
				if ($(perkSelector+' .level'+(index+1)).length > 0) {
					$(perkSelector+' .level'+(index+1)).show();
				} else {
					$(perkSelector+' div:first-child').show();
				}
			}
		}).mouseout(function(){
			$('#perksInfo').hide();
			$('.perks').hide();
			$('.perks div').hide();
		});
		
		// Mouseover for options area to display option info as popup
		$('#familyArea a').mouseover(function(){
			$('#optionsInfo').show();
			$('#familyDesc').show();
		}).mouseout(function(){
			$('#optionsInfo').hide();
			$('.optionsDesc').hide();
			$('.optionsDesc div').hide();
		});
		$('#greenswardArea a').mouseover(function(){
			$('#optionsInfo').show();
			$('#greenswardDesc').show();
		}).mouseout(function(){
			$('#optionsInfo').hide();
			$('.optionsDesc').hide();
			$('.optionsDesc div').hide();
		});
		$('.optionGift a').mouseover(function(){
			$('#optionsInfo').show();
			$('#giftDesc').show();
		}).mouseout(function(){
			$('#optionsInfo').hide();
			$('.optionsDesc').hide();
			$('.optionsDesc div').hide();
		});
		
		
		if (presetType == 'gfm'){
			$('.giftBenefits').hide();
			$('#benefits_gift').show();
			$('#giftHeading').html('<h1>PURCHASE A GIFT MEMBERSHIP</h1>');
		} else {
		/* handle mousover events for donation amount (name=level_id) radio buttons */
			/*$('#memDonWrap #amountWrap ul.levels li').mouseover(function(e) {
				if ($(this).find('input').length > 0) {
					var index = $(this).find('input').attr('id').split('_')[2];
					$('.giftBenefits').hide();
					$('#benefits_'+index).show();
				}
			}).mouseout(function(e) {
				var index = $('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2];
				$('.giftBenefits').hide();
				$('#benefits_'+index).show();
			});*/
		}
		
		/* handle click events for donation amount (name=level_id) radio buttons */
		$('#memDonWrap #amountWrap ul.levels input').click(function(e) {
			var index = $('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2];
			setDonAmt(index);
			/*if (presetType != 'gfm'){
				$('.giftBenefits').hide();
				$('#benefits_'+index).show();
			}*/
			giftBenefitsIconsUpdate(index);
			if ($(this).parent().parent().hasClass('above1000')) {
				$('#memDonWrap #anonymousDonationArea').show();
				$('#memDonWrap #annualReportNameArea').show();
			} else {
				$('#memDonWrap #anonymousDonationArea').hide();
				$('#memDonWrap #annualReportNameArea').hide();
			}
			if ($('#memDonWrap #giftMembership').attr('checked')!='checked') {
				if ($(this).attr('id') == 'level_id_0' || $(this).attr('id') == 'level_id_1') {	
					changeForms(formIndividual);
					if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
						changeLevels(formIndividual);
						setType();
					}
				} else if ($(this).attr('id') == 'level_id_2') {	
					changeForms(formFamily);
					if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
						changeLevels(formFamily);
						setType();
					}
				} else {
					if ($('#memDonWrap #greenswardCircle').attr('checked')!='checked') {
						if ($(this).attr('id') == 'level_id_2') {
							changeForms(formFamily);
							if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
								changeLevels(formFamily);
							}	
						} else if (!isFamily) {
							changeForms(formIndividual);
							if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
								changeLevels(formIndividual);
								setType();
							}
						}
					}
				}
			} else {
				if ($(this).attr('id') == 'level_id_0' || $(this).attr('id') == 'level_id_1') {	
					$('#memDonWrap #amountWrap ul.levels li:not(".higherLevel")').hide();
					$('#memDonWrap #amountWrap ul.levels li').removeClass('disabled').find('input').removeAttr('disabled');
					$('#memDonWrap #amountWrap ul.levels li.individual:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.family:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.toggle').show();
					if (!$('#memDonWrap #amountWrap ul.levels input:checked').parent().parent().hasClass('individual')) {
						$('#memDonWrap #amountWrap ul.levels li.individual:eq(0) input').attr('checked','checked');
					}
					$('#memDonWrap #familyArea').removeClass('disabled');
					$('#memDonWrap #familyBenefits').removeAttr('disabled');
					if ($('#level_id_0').attr('checked')=='checked' || $('#level_id_1').attr('checked')=='checked' || !isFamily) {
						$('#memDonWrap #familyBenefits').removeAttr('checked');
						$('#memDonWrap #familyWarning').hide();
					}
					$('#memDonWrap #greenswardArea').removeClass('disabled');
					$('#memDonWrap #greenswardCircle').removeAttr('disabled');
					$('#memDonWrap #greenswardCircle').removeAttr('checked');
					$('#memDonWrap #greenswardWarning').hide();
					
					if ($('#giftMembership').attr('checked')!='checked') {
						$('#autoRenewArea').show();
						$('#declineGifts').show();
						$('#memDonWrap #eCardSection').hide();
					}
				} else if ($(this).attr('id') == 'level_id_2') {
					if ($('#memDonWrap #familyArea').hasClass('disabled') || $('#memDonWrap #amountWrap ul.levels input:checked').attr('id')=='level_id_2' || isFamily) {
						$('#memDonWrap #familyArea').removeClass('disabled');
						$('#memDonWrap #familyBenefits').removeAttr('disabled');
						$('#memDonWrap #familyBenefits').attr('checked','checked');
						$('#memDonWrap #familyWarning').show();
						$('#memDonWrap #greenswardArea').addClass('disabled');
						$('#memDonWrap #greenswardCircle').removeAttr('checked');
						$('#memDonWrap #greenswardWarning').hide();
						$('#memDonWrap #greenswardCircle').attr('disabled','disabled');
					}
					
					$('#memDonWrap #amountWrap ul.levels li:not(".higherLevel")').hide();
					$('#memDonWrap #amountWrap ul.levels li').removeClass('disabled').find('input').removeAttr('disabled');
					$('#memDonWrap #amountWrap ul.levels li.individual:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.family:not(".higherLevel"), #memDonWrap #amountWrap ul.levels li.toggle').show();
					$('#level_id_0').parent().parent().addClass('disabled');
					$('#level_id_1').parent().parent().addClass('disabled');
					if ($('#giftMembership').attr('checked')!='checked') {
						$('#autoRenewArea').show();
						$('#declineGifts').show();
						$('#memDonWrap #eCardSection').hide();
					}
				}
			}
			setSecondPersonOrGift();			
		});

		$('#memDonWrap #familyBenefits').click(function(){
			if ($(this).attr('checked') == 'checked') {
				setFamily();
			} else {
				isFamily = false;
				if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
					changeForms(formIndividual);
					changeLevels(formIndividual);
				}
			}
			setType();
		});
		
		$('#memDonWrap #greenswardCircle').click(function(){
			if ($(this).attr('checked') == 'checked') {
				setGreensward();
			} else {
				if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
					changeForms(formIndividual);
					changeLevels(formIndividual);
				}
			}
			setType();
		});
		
		$('#memDonWrap #giftMembership').click(function(){
			if ($(this).attr('checked') == 'checked') {
				setGift();
			} else {
				if ($('#memDonWrap #familyBenefits').attr('checked') == 'checked') {
					changeForms(formFamily);
					changeLevels(formFamily);
				} else if ($('#memDonWrap #greenswardCircle').attr('checked') == 'checked') {
					$('#memDonWrap #greenswardWarning').show();
					changeForms(formGreen);
					changeLevels(formGreen);
				} else {
					changeForms(formIndividual);
					changeLevels(formIndividual);
				}
			}
			setType();
		});
		
		$('#memDonWrap #premiumDeclined').click(function(){
			var index = $('#memDonWrap #amountWrap ul.levels input:checked').attr('id').split('_')[2];
			/*if (presetType != 'gfm'){
				$('.giftBenefits').hide();
				$('#benefits_'+index).show();
			}*/
			giftBenefitsIconsUpdate(index);
		});
		
		$('#addSecondPerson').click(function(){
			if ($(this).attr('checked') == 'checked') {
				$('.jointDonor').removeClass('disabled');
				$('.jointDonor input').removeAttr('disabled');

			} else {
				$('.jointDonor').addClass('disabled');
				$('.jointDonor input').attr('disabled','disabled');
			}
		});
		
		$('#anonymousDonation').click(function(){
			if ($(this).attr('checked') == 'checked') {
				$('#annualReportNameArea').hide();
			} else {
				$('#annualReportNameArea').show();
			}
		});
		
		/* show or hide the eCard section based on the eCard checkbox
		   adds/removed validation rules based on visibility of eCard section */
		$('#ecardSend').click(function() {
			if ( $(this).attr('checked') == 'checked' ) {
				$('#memEcardWrap')
					.css({ 'display': 'block', 'height': '0px' })
					.stop()
					.animate({ 'height': '280px' }, 500);
				$('#ecardSubject').rules('add', { 'required': true, 'maxlength': 50 });
				$('#ecardMessage').rules('add', { 'required': true, 'maxlength': 255 });
				$('#ecardRecipients')
					.rules('add', {
						required	: true,
						email		: true
					});
			} else {
				$('.memFFWrap label.error').remove();
				$('#memEcardWrap')
					.stop()
					.animate({ 'height': '0px' }, 1000, '', function() { $(this).css('display', 'none'); });
				$('#ecardSubject').removeClass('error').addClass('valid').rules('remove' );
				$('#ecardMessage').removeClass('error').addClass('valid').rules('remove' );
				$('#ecardRecipients').removeClass('error').addClass('valid').rules('remove');
			}
		});
		
		/* fades in/out credit card logos based on credit card type
		   credit card type is identified in the keyup event for the credit card field */
		function swapLogos( selector ) {
			$('#visa_logo, #mc_logo, #amx_logo, #disc_logo')
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
		
		var askChoice = Math.floor(Math.random() * 2);
		if (askChoice == 0) {
			$('.imageTest').attr('src','../images/donate_levels/PicnicTote-JiJ.jpg');
			$('#randomAsk').text('Join_in_June_tote');
		}
		
		// account for donation type in URL param
		if (presetType == 'fam' || presetType == 'fmn') {
			setFamily();
			setType();
			$('#familyBenefits').attr('checked','checked');
		} else if (presetType == 'gcn' || presetType == 'greensward') {
			setGreensward();
			setType();
			$('#greenswardCircle').attr('checked','checked');
		} else if (presetType == 'gfm' || presetType == 'gift') {
			setGift();
			setType();
			$('#giftMembership').attr('checked','checked');
		}		
				
		/* override the HTML form submission so the user remains on the page while the AJAX processing can occur */
		$('#donation_form_id').submit(function() {
			processDonationForm();
			return false;
		});
		
		//Shadowbox.init({ skipSetup: true });
		
		$('#donation_form_id').attr('action', 'javascript:void(0);');
		
		/* Initialize rules and values on page load */
		$('ul.levels input:checked').click();
		if ($('#familyBenefits').attr('checked')=='checked') {
			isFamily = true;
			$('#memDonWrap #familyWarning').show();
			if ($('#level_id_0').attr('checked')=='checked' || $('#level_id_1').attr('checked')=='checked') {
				$('#level_id_2').attr('checked','checked');
				setDonAmt(2);
			}
			changeForms(formFamily);
			if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
				changeLevels(formFamily);
			}
		}
		if ($('#greenswardCircle').attr('checked')=='checked') { 
			changeForms(formGreen);
			$('#memDonWrap #greenswardWarning').show();
			if ($('#memDonWrap #giftMembership').attr('checked') != 'checked') {
				changeLevels(formGreen);
			}
		}
		if ($('#giftMembership').attr('checked')=='checked') { 
			changeForms(formGift);
			changeLevels(formGift);
		}
		
	});
	
})(jQuery);
