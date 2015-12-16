[[U8:text/javascript]]
//v12 - 29 Mar 2013
//////////////////////////////////////////////////////////////////////////////////
// globals
var process_registration_request = '';
var submitUrl = 'AjaxProxy?auth=[[S86:true]]&cnv_url=https://secure2.convio.net/cpc/site/CRTeamraiserAPI'; 
//var myTeam = $('#teamId').val();
var myTeam = [[S334:team_id]];

var donateFlag = true;
var fr_id = 1061;
var participation_id = 1101; // ID for attendee Participation type

var additional_gift, host, numRsvp, myFirstName, myFirstName, myLastName, myStreet1, myStreet2, myCity, myStateProv, myPostalCode, myEmail, myGuestNameFirst, myGuestNameLast, myGuestName, myGuestEmail, myName, myCityStateZip, myEmailOptIn, myCode;
	
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
};

/* function to validate the form and submit the data for processing via AJAX */
function processRegistrationForm() {
	additional_gift = parseInt($('#donationAmount').val().replace('$','').replace(',',''),10);
	host = $('#specificHosts').text();
	numRsvp = $('#numberAttending').val();
	myFirstName = $('#billingNameFirst').val();
	myLastName = $('#billingNameLast').val();
	myStreet1 = $('#billingAddressStreet1').val();
	myStreet2 = $('#billingAddressStreet2').val();
	myCity = $('#billingAddressCity').val();
	myStateProv = $('#billingAddressState').val();
	myPostalCode = $('#billingAddressZip').val();
	myEmail = $('#donorEmail').val();
	myGuestNameFirst = $('#guestNameFirst').val();
	myGuestNameLast = $('#guestNameLast').val();
	myGuestName = (''+myGuestNameFirst+' '+myGuestNameLast);
	myGuestEmail = $('#guestEmail').val();
	myName = (''+myFirstName+' '+myLastName);
	myCityStateZip = (''+myCity+', '+myStateProv+' '+myPostalCode);
	myEmailOptIn = $('#emailOptIn').prop('checked');
	myCode = $('#teamPagePartyInfo').text(); // stored as screenname, called and parsed in host interface
	//alert('invite code: '+myCode);
	
	$('#errorMessage').html('').hide();
	$.ajax({
		url: window.location+'&s_myName='+myName+'&s_myStreet1='+myStreet1+'&s_myStreet2='+myStreet2+'&s_myCityStateZip='+myCityStateZip+'&s_myEmail='+myEmail+'&s_myDonateFlag='+donateFlag+'&s_myDonation='+additional_gift+'&s_myGuestName='+myGuestName+'&s_myGuestEmail='+myGuestEmail+'&s_myNumRsvp='+numRsvp,
		success: function(data, textStatus, jqxhr){
			console.log('ajax sesh variable success...');
			console.log(data.responseText);
			console.log(textStatus);
			console.log(jqxhr);
		},
		error: function(data, textStatus, jqxhr){
			console.log('ajax sesh variable failure...');
			console.log(data.responseText);
			console.log(textStatus);
			console.log(jqxhr);
		}
	});
    $('#donationAmount').val($('#donationAmount').val().replace('$','').replace(',',''));
	if (!donateFlag) {
		$('#donationAmount').val('');
	}
	if ( $('#reg_donForm').valid() ) {
		$('#submitButtons').hide();
		$('#memLoader').css('opacity', '0.5').show().center();
		var ssource = $('#sub_source').val();
		buildXmlFromInputs(donateFlag);
        var params = {
			method: "processRegistration",
			api_key: "cpcapis",
			v: "1.0",
			source: "C2S13",
			sub_source: ssource,
			suppress_registration_autoresponders: !donateFlag,
			registration_document: process_registration_request
		};
		$('#ccApiErrors').hide();
		$.ajax({
			type		: 'post',
			data		: params,
			headers:{
				'X-Requested-With':'Foo'
			},
			url			: '[[S551:CRTeamraiserAPI]]',
			success		: function(data, textStatus, jqxhr){
				//console.log(data.responseText);
				//console.log(textStatus);
				//console.log(jqxhr);
				window.location = 'https://secure2.convio.net/cpc/site/SPageServer?pagename=c2s_thank_you_page&team_id='+myTeam+'&team_name='+$("#teamName").text();
			},
			error		: function(data) {
				$('#submitButtons').show();
				$('#memLoader').hide();
				if ($(data.responseText).find('message').length > 0 && $(data.responseText).find('message').html() != '') {
					if ($(data.responseText).find('message').html() == 'The registration failed.') {
						$('#errorMessage').show().html('Your registration failed. Please review your information and credit card details to confirm that everything is accurate.');
					} else if ($(data.responseText).find('message').html().indexOf('DECLINED') >= 0) {
						$('#errorMessage').show().html('Your credit card was declined. Please review your credit card details to confirm that everything is accurate.');
					} else if ($(data.responseText).find('message').html().indexOf('address') >= 0 || $(data.responseText).find('code').html() == '2610') {
						$('#errorMessage').show().html('Address Error: Please check the address that you entered, including ZIP code.');
					} else if ($(data.responseText).find('message').html().indexOf('already registered') >= 0 || $(data.responseText).find('message').html() == '2659') {
						$('#errorMessage').show().html('Our records show that you are already attending this party. If you need help, or want to change your reservation information, please contact <a href="mailto:jjacuzzi@centralparknyc.org">jjacuzzi@centralparknyc.org</a>. You may also <a href="https://secure2.convio.net/cpc/site/Donation2?df_id=3440&FR_ID=1061&PROXY_ID='+myTeam+'&PROXY_TYPE=22&3440.donation=form1&team_name='+$('#teamName').text()+'">make an additional donation</a> to your building.');
					} else {
						$('#errorMessage').show().html($(data.responseText).find('message').html());
					}
				}
			}
		});
	} else {
		if (lightbox2) {
			lightbox2.close();
		}
		window.scrollBy(0,-50);
	}
};

//////////////////////////////////////////////////////////////////////////////////
// function buildXmlFromInputs - gathers all field data and formats as XML
// uses global var process_registration_request
// see its helper functions, following

function buildXmlFromInputs(donateFlag) {
    process_registration_request = '<processRegistrationRequest xmlns="http://convio.com/crm/v1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://convio.com/crm/v1.0 http://service.convio.net/xmlschema/crm.public.v1.xsd">';
    addNode('eventId', fr_id);
    addNode('teamId', myTeam);
    beginGroup('primaryRegistration');
	addNode('fundraisingGoal', numRsvp); // used for # attending - called and parsed in host interface
	addNode('screenName', myCode); // used for invite code - called and parsed in host interface
    addNode('emailOptIn', myEmailOptIn);
    addNode('mailOptIn', true);  // ***right?
    addNode('partTypeId', participation_id);
    addNode('email', myEmail);
    addNode('firstName', myFirstName);
    addNode('lastName', myLastName);
    addNode('street1', myStreet1);
    addNode('street2', myStreet2);
    addNode('city', myCity);
    addNode('stateProv', myStateProv);
    addNode('postalCode', myPostalCode);
    addNode('country', 'United States'); // NOTE: default US?
 
    // question: # attendees
    beginGroup('question');
	addNode('id', 5380);
	addNode('type', 'PARTICIPATION_TYPE');
	addNode('response', numRsvp);
	endGroup('question');
	
	// question: which host
    beginGroup('question');
	addNode('id', 5400);
	addNode('type', 'PARTICIPATION_TYPE');
	addNode('response', host);
	endGroup('question');
	
	// question: guest name
	if (numRsvp > 1) {
		beginGroup('question');
		addNode('id', 5422);
		addNode('type', 'PARTICIPATION_TYPE');
		addNode('response', myGuestNameFirst);
		endGroup('question');
		
		beginGroup('question');
		addNode('id', 5420);
		addNode('type', 'PARTICIPATION_TYPE');
		addNode('response', myGuestNameLast);
		endGroup('question');
		
		beginGroup('question');
		addNode('id', 5421);
		addNode('type', 'PARTICIPATION_TYPE');
		addNode('response', myGuestEmail);
		endGroup('question');
	}
	if (donateFlag) {
		if (additional_gift > 0) {
			beginGroup('additionalGift');
			addNode('amount', additional_gift);
			endGroup('additionalGift');
		} else {
			//error handling if no $amount
		}
		endGroup('primaryRegistration');
		addNode('paymentType', 'CREDIT_CARD');
		addNode('billingFirstName', myFirstName);
		addNode('billingLastName', myLastName);
		addNode('billingEmail', myEmail);
		addNode('billingStreet1', myStreet1);
		addNode('billingStreet2', myStreet2);
		addNode('billingCity', myCity);
		addNode('billingState', myStateProv);
		addNode('billingZip', myPostalCode);
		addNode('billingCountry', 'United States');
		addNode('creditCardNumber', $('#cardNumber').val());
		addNode('creditCardExpMonth', $('#cardExpDateMonth').val());
		addNode('creditCardExpYear', $('#cardExpDateYear').val());
		addNode('creditCardVerificationCode', $('#cardCVV').val());
	} else {
    	endGroup('primaryRegistration');
    }
    endGroup('processRegistrationRequest');
}

function beginGroup(group) {
    console.log('<' + group + '>');
    process_registration_request += '<' + group + '>';
}

function addNode(node, val) {
    if (val == null || val == '') {
        console.log('<' + node + ' xsi:nil="true" />');
        process_registration_request += '<' + node + ' xsi:nil="true" />';
    } else {
        console.log('<' + node + '>' + val + '</' + node + '>');
        process_registration_request += '<' + node + '>' + htmlEncode(val) + '</' + node + '>';
    }
}

function htmlEncode(value) {
    if (value != null) {
        return $('<div/>').text(value).html();
    }
    return '';
}

function endGroup(group) {
    console.log('</' + group + '>');
    process_registration_request += '</' + group + '>';
}

/* onload */
(function($) {
	$(function() {
		/* static and some dynamic validation rules for the registration/donation form
		   only handling front-end validation */
		$('#reg_donForm').validate({
			rules: {
				'billing.name.first'		: { 'required' : true, 'maxlength' : 50 },
				'billing.name.last'			: { 'required' : true, 'maxlength' : 50 },
				'billing.address.street1'	: { 'required' : true, 'maxlength' : 50 },
				'billing.address.street2'	: { 'maxlength' : 50 },
				'billing.address.city'		: { 'required' : true, 'maxlength' : 50 },
				'billing.address.state'		: 'required',
				'billing.address.zip'		: 'required',
				'donor.email'				: { 'required': true, 'email': true, 'maxlength' : 50 },
				'card_number'				: { 'required': { depends	: function(el) { return donateFlag; }}
												},
				'card_cvv'					: { 'required': { depends	: function(el) { return donateFlag; }}
												},
				'card_exp_date_month'		: { 'required': { depends	: function(el) { return donateFlag; }}
												},
				'card_exp_date_year'		: { 'required': { depends	: function(el) { return donateFlag; }}
												},
                'other_amount'				: { 'required': { depends	: function(el) { return donateFlag; }},
												'min' : function() { if ( donateFlag ) { return 5;} }
												}
			},
			messages: {
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
                'other_amount'				: { 'required':		'* please enter an amount',
												'min':	'* a minimum of $5 is required' }
			}
		});
			   
		/* STARTUP */
		/* override the HTML form submission so the user remains on the page while the AJAX processing can occur */
		$('#btnDonateRSVP').click(function() {
			donateFlag = true;
			processRegistrationForm();
			return false;
		});
		
		$('#noDonateButton').click(function() {
			if (lightbox2) {
				lightbox2.close();
			}
			donateFlag = false;
			processRegistrationForm();
			return false;
		});
		
		/*$('#addGuest').click(function() {
			updateSurvey();
			return false;
		});*/
		
		$('#numberAttending').click(function(){
			if ($(this).val() == 2) {
				$('.guest').removeClass('disabled');
				$('.guest input').removeAttr('disabled');
			} else {
				$('.guest').addClass('disabled');
				$('.guest input').attr('disabled','disabled');
			}
		});

		//Shadowbox.init({ skipSetup: true });

		$('#reg_donForm').attr('action', 'javascript:void(0);');
	});
	
})(jQuery);
