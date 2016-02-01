<script type="text/javascript">// <![CDATA[
(function($){
  $(function() {
    $('.ObjTitle').html('Buy Tickets for Taste of Summer 2016 <br/> Wednesday, June 8th at Bethesda Terrace in Central Park');
    $('#s_rememberMe').parents().eq(1).hide();
    $('p:contains("Available Ticket Classes for This Event")').hide();
    $('p:contains("Ticket Class")').parents().eq(3).hide();
    $('p:contains("Request Purchases Here")').hide();
    $('#tix_total_quantity').parents().eq(2).hide();
    $('#gift_value').parents().eq(2).hide();
    $('span.num').hide();
    var nameGuests = $('#1872_6209_3_8036').parents().eq(2);
    var namePrinted = $('#1872_6209_2_8035').parents().eq(2);
    $(nameGuests).hide();
    $(namePrinted).hide();
    
    function checkTickets() {
      var myTixCost = $('#total_amount').val(); //This returns a string
      var myCostLength = myTixCost.length; //This gets the length of the string
      var myLengthAdjusted = myCostLength - 3; //This returns the index of the decimal in the string because you don't want .00 in the string
      var myTixVal = myTixCost.slice(1, myLengthAdjusted); //This slices out the dollar sign from the beginning and the .
     
      if (myTixVal > 400) {
        $(nameGuests).show();
      }
      else {
        $(nameGuests).hide();
      } 
      if (myTixVal > 800) {
        $(namePrinted).show();
      }
      else {
        $(namePrinted).hide();
      }
    }  

    $('input').change(function(){
      checkTickets();
    });   
  });
})(jQuery);
// ]]></script>
