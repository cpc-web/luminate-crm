<script type="text/javascript">// <![CDATA[
(function($){
  $(function() {
    var questionOne = $('#1872_5760_2_7061').parent().parent().parent();
    var questionTwo = $('#1872_5760_3_7062').parent().parent().parent();
    var questionThree = $('#1872_5760_4_7080').parent().parent().parent();
    $(questionOne).hide();
    $(questionTwo).hide();
    $(questionThree).hide();
    $('.num').hide();
    $("p:contains('Available Ticket Classes for This Event')" ).hide();


    function checkTickets() {
      var myTixCost = $('#tix_total_cost').val(); //This returns a string
      var myCostLength = myTixCost.length; //This gets the length of the string
      var myLengthAdjusted = myCostLength - 3; //This returns the index of the decimal in the string because you don't want .00 in the string
      var myTixVal = myTixCost.slice(1, myLengthAdjusted); //This slices out the dollar sign from the beginning and the .
      var greatLawnTix = $('#tix_quantity_3705').val();
      var sheepMeadowTix = $('#tix_quantity_3706').val();
      var cedarHillTix = $('#tix_quantity_3707').val();
     
      if (myTixVal >= 12500 || greatLawnTix > 1 || sheepMeadowTix > 1 || cedarHillTix > 1 ) {
        $(questionOne).show();
        $(questionTwo).show();
      } else {
        $(questionOne).hide();
        $(questionTwo).hide();
      }
    }  

    $('input').change(function(){
      checkTickets();
    }); 
  });
})(jQuery);
// ]]></script>

<script type="text/javascript">// <![CDATA[
(function($){
  $(function() {
    var tableUseless = $(".lc_Heading:contains('Limit')" );
    $(tableUseless).parent().parent().hide();
    $('.ObjTitle').html('<h3>Buy Tables and Tickets for Autumn in Central Park 2015</h3>');
  });
})(jQuery);
// ]]></script>

