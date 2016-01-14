<script type="text/javascript">
(function($){
  $(function() {
		var tableUseless = $(".lc_Heading:contains('Limit')" );
		$(tableUseless).parent().parent().hide();
		$('.ObjTitle').html('<h3>Buy Tickets for Playground Partners Winter Luncheon<br />Wednesday, February 3, 2016</h3>');
		$("p:contains('Request Purchases Here')" ).hide();
		$("p:contains('Available Ticket Classes for This Event:')" ).hide();
		$('.num').hide();
  });
})(jQuery);

</script>

<style>
.label {
color: black;
font-size: 16px;
text-align: left;
}

.container{
margin-bottom: 20px;
}
</style>