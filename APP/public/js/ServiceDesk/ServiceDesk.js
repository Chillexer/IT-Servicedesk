

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
  checkboxarr.forEach(element => {
    $("#" + element.id).find('input[type="checkbox"]').prop("checked", false);
  });
  stararr.forEach(element => {
    $("#" + element.id).find('.star').css("color", "#eee");
  });
  checkboxarr = [];
  stararr = [];
  $(".delete-selected").css("display", "");
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabname).style.display = "table";
  evt.currentTarget.className += " active";
  if (tabname == "tab-2")
    tab2();
  else if (tabname == "tab-1")
    tab1();
  else if (tabname == "tab-3")
    tab3();
}

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
};

// HHD
function InitHDD(HDDdata){
  HDDdata[0].forEach((item, id) => {
        $('#hdd').append('<option value="'+item.Size+'">'+item.Size+ ' GB </option>');
  });
};

//Template GetTemplateRamDisk
function InitTemplatesRamDisk(TemplateRamDisk){
  $('#template').append('<option value="0"> --- </option>');
  TemplateRamDisk[0].forEach((item, id) => {
    // console.log(TemplateRamDisk);
    // console.log(item);
    // $('#template').append('<option value="'+item.ID+'">'+item.Name+ ' </option>');
  });
};

//Templates
function InitTemplates(TemplateData){
  $('#template').append('<option value="0"> --- </option>');
  $('#template').append('<option value="ny"> Ny Template </option>');
  TemplateData[0].forEach((item, id) => {
      // console.log(TemplateData);
      // console.log(item);
      $('#template').append('<option value="'+item.ID+'">'+item.Name+ ' </option>');
      //Add status options
      $('#status').append('<option value="Ukendt" selected="selected">Ukendt</option>')
      $('#status').append('<option value="Klar til salg">Klar til salg</option>')
      $('#status').append('<option value="Venter på reservedele">Venter på reservedele</option>')
      $('#status').append('<option value="Skrottet">Skrottet</option>')
  });

  $('#template').on('change', function () {
    //console.log($('#template').val());
    console.log(TemplateData);
  
    if ($('#template').val() != 0 && $('#template').val() != 'ny') {
      $('#name').val(TemplateData[0][0].Name);
      $('#make').val(TemplateData[0][0].PCMake);
      $('#model').val(TemplateData[0][0].PCModel);
      $('#cpu').val(TemplateData[0][0].CPU);
      $('#description').val(TemplateData[0][0].Description);
      $('#ram').val(TemplateData[0][0].RAM);
      $('#hdd').val(TemplateData[0][0].HDD);

      $('#name').prop('readonly', 'readonly');
      $('#make').prop('readonly', 'readonly');
      $('#model').prop('readonly', 'readonly');
      $('#cpu').prop('readonly', 'readonly');
      $('#description').prop('readonly', 'readonly');
      $('#ram').attr('disabled', 'disabled');
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

      $('#name').prop('readonly', false);
      $('#make').prop('readonly', false);
      $('#model').prop('readonly', false);
      $('#cpu').prop('readonly', false);
      $('#description').prop('readonly', false);
      $('#ram').attr('disabled', false);
      $('#hdd').attr('disabled', false);
    }
  });
};

// SaveTemplate
function InitSaveTemplate(RAMdata){
  // Lav popup
};

function CreateForm(Form){
$('#template').off();
$("#altform").html("");
Forms[Form].forEach(element => {
  $("#altform").append(element);
});

}

function DataInserter(Form, ID){
  CreateForm(Form);
  var SQL = {
    ShowOrder: ["OrderByID" ,"CALL GetOrderByID(" + ID + ")"],
    ShowPC: ["ProductElement" ,ID]
  }
  socket.emit(SQL[Form][0] ,SQL[Form][1]);
}