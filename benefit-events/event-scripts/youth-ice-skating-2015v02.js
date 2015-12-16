<script type="text/javascript">// <![CDATA[
(function ($) {
  $("label:contains('Session')").css('margin-left', '10px');
  $("p:contains('Name:')").css('font-weight', 'bold');
  $("p:contains('ZIP / Postal Code:')").css('font-weight', 'bold');
  var oldChoiceSelected = choiceSelected;
  var child2Name;
  var child2Age;
  var child3Name;
  var child3Age;
  setTimeout(function() {
    child2Name = $("label[for='1872_5967_6_7599']").parents().eq(1).hide();
    child2Age = $("label[for='1872_5967_7_7600']").parents().eq(1).hide();
    child3Name = $("label[for='1872_5967_8_7601']").parents().eq(1).hide();
    child3Age = $("label[for='1872_5967_9_7602']").parents().eq(1).hide();
  }, 0);

  function changeChoice(id, val) {
    console.log(id, val);
    if (id == '1872_5967_3_7596 ') {
      if(val == '2') {
        $(child2Name, child2Age).show();
        $(child3Name, child3Age).hide();
      } else if(val == '3') {
        $(child2Name, child2Age).show();
        $(child3Name, child3Age).show();
      } else  {
        $(child2Name, child2Age, child3Name, child3Age).hide();
      }
    return oldChoiceSelected(id, val);
    }
  }  
  $('select#1872_5967_3_7596').change(function(){
    changeChoice();
  }); 
})(jQuery);
// ]]></script> 