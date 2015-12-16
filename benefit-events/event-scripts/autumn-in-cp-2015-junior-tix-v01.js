
<script type="text/javascript">// <![CDATA[
(function($){
	$(".ObjTitle").html('<h3>Buy Young Associates Tickets for Autumn in Central Park<br/>Wednesday, November 4, 2015</h3>');
	$("label[for='s_rememberMe']").parent().hide();
	$("p:contains('Available Ticket Classes for This Event:')" ).hide();
	$("p:contains('Ticket Class')" ).parents().eq(3).hide();
	$("p:contains('Request Purchases Here')" ).hide();
	$("p:contains('Name')").text("Attendee Name").css('font-weight', 'bold');
	$("p:contains('Email')").text("Attendee Email").css('font-weight', 'bold');
	var myGuests = $("label[for='1872_5906_4_7456']").parents().eq(1).hide();

	function checkTix () {
		var myTotalTix = $('#tix_total_quantity').val();
		myTotalTix;
		if (myTotalTix > 1) {
			$(myGuests).show();
		}
		else {
			$(myGuests).hide();
		}
	}

	$('input').change(function(){
	  checkTix();
	}); 
})(jQuery);
// ]]></script>	