<script type="text/javascript">// <![CDATA[
// <![CDATA[
(function($){
  $(function() {
    $('#1872_5400_2_6560').parent().parent().parent().hide();
    $('#1872_5400_3_6580').parent().parent().parent().hide();
    function checkTickets() {
      var myTixCost = $('#tix_total_cost').val(); //This returns a string
      var myCostLength = myTixCost.length; //This gets the length of the string
      var myLengthAdjusted = myCostLength - 3; //This returns the index of the decimal in the string because you don't want .00 in the string
      var myTixVal = myTixCost.slice(1, myLengthAdjusted); //This slices out the dollar sign from the beginning and the .00 from the end
      //var myValInt = parseInt(myTixVal);
        //console.log(myTixCost, ' ', myCostLength, " ", myLengthAdjusted, " ", myTixVal, " ", myValInt );
        if (myTixVal >= 10000 ) {
          $('#1872_5400_3_6580').parent().parent().parent().show();
          $('#1872_5400_2_6560').parent().parent().parent().show();
        } else {
        $('#1872_5400_3_6580').parent().parent().parent().hide();
        $('#1872_5400_2_6560').parent().parent().parent().hide();
        $('#1872_5400_3_6580').val(' ');
        $('#1872_5400_2_6560').val(' ');
      }
    }
    $('input').change(function(){
      checkTickets();
    }); 
  });
})(jQuery);
// ]]></script>