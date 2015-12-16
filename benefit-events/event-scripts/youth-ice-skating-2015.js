// $('.ObjTitle h3').css('font-size','24px').html()
// $('.ObjTitle').html('<h3 class="font-size: 24px; color: #039; ">Youth Beginner Ice Skating Clinics</h3><div style="color: #333; font-weight: normal; margin-bottom: 30px; ">Lasker Rink, Mid-Park between 106th and 108th Streets<br/><br/>Participants may register for up to two sessions.  Each session consists of five 45-minute lessons.</div>');

$("label:contains('Session')").css('margin-left', '10px');
$("p:contains('Name:')").css('font-weight', 'bold');
$("p:contains('ZIP / Postal Code:')").css('font-weight', 'bold');

var myNumKids = $('select#1872_5967_3_7596').val();


function pickNumKids() {
  if (myNumKids == "2") {

  } else if (myNumKids == "3"){ 
  	$(child3Name).show();
  	$(child3Age).show();
  }
}
$('select#1872_5967_3_7596').change(function(){
  choiceSelected();
  console.log(myNumKids);
}); 


var child2Name = $("label[for='1872_5967_6_7599']").parents().eq(1).hide();
var child2Age = $("label[for='1872_5967_7_7600']").parents().eq(1).hide();
var child3Name = $("label[for='1872_5967_8_7601']").parents().eq(1).hide();
var child3Age = $("label[for='1872_5967_9_7602']").parents().eq(1).hide();
var oldChoiceSelected = choiceSelected;

choiceSelected = function(id, val) {
  if (id == '1872_5967_3_7596 ') {
    if(val == '2') {
      $(child2Name).show();
      $(child2Age).show();
    } 
    else if (val = '3'){
      $(child3Name).show();
      $(child3Age).show();
    }
  }
  return oldChoiceSelected(id, val);
}