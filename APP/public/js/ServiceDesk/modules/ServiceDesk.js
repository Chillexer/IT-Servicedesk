
//Sørger for at man kan ændre tabs
function changeTab(evt, tabname) {
  // Declare all variables
  var i, tabcontent, tablinks;
  currenttab = tabname;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  //Sets all checkboxes to unchecked 
  checkboxarr.forEach(element => {
    $("#" + element.id).find('input[type="checkbox"]').prop("checked", false);
  });
  //Changes Star color back to normal
  stararr.forEach(element => {
    $("#" + element.id).find('.star').css("color", "#eee");
  });
  //Resets Arrays
  checkboxarr = [];
  stararr = [];
  $(".delete-selected").css("display", "");
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabname).style.display = "table";
  evt.currentTarget.className += " active";
  //Checks which tab currently selected and run the right tab init
  if (tabname == "tab-2")
    tab2();
  else if (tabname == "tab-1")
    tab1();
  else if (tabname == "tab-3")
    tab3();
}
//Runs changeTab when tab button gets clicked
$(".tablinks").each(function(){
  $(this).on("click",function(ev){
  changeTab(ev, ev.target.id.replace("-btn", ""));
});
});

















//de her 3 funktioner står for at hente det rigtige data til de 3 tabs
function tab3() {
  var sql = "SELECT * FROM `PC` where ItemStatus != 'klar til salg' AND ItemStatus != 'skrottet'";
  socket.emit("SQLQuery", sql);
}

function tab2() {
  var sql = "SELECT * FROM `PC` where ItemStatus = 'klar til salg'";
  socket.emit("SQLQuery", sql);
}

function tab1() {
  var sql = "CALL GetOrders()";
  socket.emit("SQLQuery", sql);
}
tab1();

// Fill new PC form
//RAM
function Init(RAMdata){
  RAMdata[0].forEach((element, id) => {
        $('#ram').append('<option value="'+element.Size+'">'+element.Size+ ' GB RAM </option>');
  });
}

// HHD
function InitHDD(HDDdata){
  HDDdata[0].forEach((item, id) => {
        $('#hdd').append('<option value="'+item.Size+'">'+item.Size+ ' GB </option>');
  });
}


//Templates
function InitTemplates(TemplateData){
  $('#template').append('<option value="0"> --- </option>');
  $('#template').append('<option value="ny"> Ny Template </option>');
  // Add status options
  $('#status').append('<option value="Ukendt" selected="selected">Ukendt</option>');
  $('#status').append('<option value="Klar til salg">Klar til salg</option>');
  $('#status').append('<option value="Venter på reservedele">Venter på reservedele</option>');
  $('#status').append('<option value="Skrottet">Skrottet</option>');
  TemplateData[0].forEach((item, id) => {
    // console.log(TemplateData);
      // console.log(item);
      $('#template').append('<option value="'+item.ID+'">'+item.Name+ ' </option>');
  });

  $('#template').on('change', function () {
    //console.log($('#template').val());
    var _this = this;
  
    if ($('#template').val() != 0 && $('#template').val() != 'ny') {
      var ID = 0;
      TemplateData[0].forEach((element, id) => {
        if(element.ID == $(_this).val())
        ID = id;
      });
      $('#name').val(TemplateData[0][ID].Name);
      $('#make').val(TemplateData[0][ID].PCMake);
      $('#model').val(TemplateData[0][ID].PCModel);
      $('#cpu').val(TemplateData[0][ID].CPU);
      $('#description').val(TemplateData[0][ID].Description);
      $('#ram').val(TemplateData[0][ID].RAM);
      $('#hdd').val(TemplateData[0][ID].HDD);
       $('#name').prop('readonly', 'readonly');
      $('#make').prop('readonly', 'readonly');
      $('#model').prop('readonly', 'readonly');
      $('#cpu').prop('readonly', 'readonly');
      $('#description').prop('readonly', 'readonly');
      //$('#ram').attr('disabled', 'disabled');
      $('#hdd').attr('disabled', 'disabled');
    }
    else if ($('#template').val() == 'ny')
    {
      // remove readonly og gammelt input
      $('#name').val("");
      $('#make').val("");
      $('#model').val("");
      $('#cpu').val("");
      $('#description').val("");
       $('#name').prop('readonly', false);
      $('#make').prop('readonly', false);
      $('#model').prop('readonly', false);
      $('#cpu').prop('readonly', false);
      $('#description').prop('readonly', false);
      $('#ram').attr('disabled', false);
      $('#hdd').attr('disabled', false);
     }
  
    else
    {
      $('#name').val("");
      $('#make').val("");
      $('#model').val("");
      $('#cpu').val("");
      $('#description').val("");
      $('#name').prop('readonly', true);
      $('#make').prop('readonly', false);
      $('#model').prop('readonly', false);
      $('#cpu').prop('readonly', false);
      $('#description').prop('readonly', false);
      $('#ram').attr('disabled', false);
      $('#hdd').attr('disabled', false);
    }
  });
}

function InitSaveTemplate(RAMdata){
  // Lav popup
}

//Står for at Oprette formen
function CreateForm(Form){
$('#template').off();
$(".close-form, .btn-back").off();
$("#form-new-edit form").html("");
$("#form-new-edit form").attr("id", "altform");
Forms[Form].forEach(element => {
  $("#form-new-edit form").append(element);
});
if(Form == "CreatePC")
$(".edit-form").css("display", "none");
else
$(".edit-form").css("display", "");

$(".close-form, .btn-back").click(function () {
  $(".tab").css("display", "");
  if (currenttab == "tab-1") tab1();
  else if (currenttab == "tab-2") tab2();
  else if (currenttab == "tab-3") tab3();
});

}
//Indsætter det rigtige data ind i formen
function DataInserter(Form, ID){
  CreateForm(Form);
  var SQL = {
    ShowOrder: ["OrderByID" ,"CALL GetOrderByID(" + ID + ")"],
    ShowPC: ["PCElement" ,ID]
  };
  socket.emit(SQL[Form][0] ,SQL[Form][1]);
}