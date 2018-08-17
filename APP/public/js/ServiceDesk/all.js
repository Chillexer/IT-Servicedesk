var stararr = [];
var checkboxarr = [];
var tab = 1;
var created = false;
var currenttab = "tab-1";
//Creates html strings for Forms Array
function InputGen(name, type){
    if(type.toLowerCase() == "select")
    return '<div class="form-group">' +
    '<label for="'+name+'">'+name+':</label>' +
    '<select id="'+name+'" name="'+name+'"' + 
    'class="form-control" required></select>'+
    '</div>';
    else if(type.toLowerCase() == "hidden")
    return '<div class="form-group">' +
    '<input type="'+type+'" id="'+name+'" ' +
    'class="form-control" name="'+name+'" ' +
    'placeholder="'+name+'"></div>';
    else  
    return '<div class="form-group">' +
    '<label for="'+name+'">'+name+':</label>' +
    '<input type="'+type+'" id="'+name+'" ' +
    'class="form-control" name="'+name+'" ' +
    'placeholder="'+name+'"></div>'; 
  }
//Bruges til at oprette de forskellige forms
var Forms = {
    CreatePC: [
      '<h2 class="form-new-heading">Opret Ny PC</h2>',
      InputGen("template", "select"),
      InputGen("name", "text"),
      InputGen("make", "text"),
      InputGen("model", "text"),
      InputGen("serial", "text"),
      InputGen("cpu", "text"),
      InputGen("ram", "select"),
      InputGen("hdd", "select"),
      InputGen("description", "text"),
      InputGen("status", "select"),
      '<button id="btn-submit" ' +
      'class="btn btn-lg btn-primary btn-block" ' + 
      'type="submit">Opret</button>',
      '<button id="btn-back" ' +
      'class="btn-back btn btn-lg btn-danger btn-block" ' +
      'type="button">Annuller</button>'
    ],
    ShowOrder: [
      '<h2 class="form-new-heading">Ordre</h2>',
      InputGen("cid", "hidden"), 
      InputGen("id", "hidden"),    
      InputGen("name", "text"),
      InputGen("email", "text"),
      InputGen("number", "text"),
      InputGen("make", "text"),
      InputGen("model", "text"),
      InputGen("cpu", "text"),
      InputGen("ram", "text"),
      InputGen("hdd", "text"),
      InputGen("price", "text"),
      InputGen("status", "select"),
      '<button id="btn-submit" ' +
      'class="btn btn-lg btn-primary btn-block" ' + 
      'type="submit">Gem</button>',
      '<button id="btn-back" ' +
      'class="btn-back btn btn-lg btn-danger btn-block" ' +
      'type="button">Annuller</button>'
    ],
    ShowPC: [
      '<h2 class="form-new-heading">PC</h2>',
      InputGen("id", "hidden"),   
      InputGen("make", "text"),
      InputGen("model", "text"),
      InputGen("serial", "text"),
      InputGen("cpu", "text"),
      InputGen("ram", "text"),
      InputGen("hdd", "text"),
      InputGen("description", "text"),
      InputGen("status", "select"),
      '<button id="btn-submit" ' +
      'class="btn btn-lg btn-primary btn-block" ' + 
      'type="submit">Gem</button>',
      '<button id="btn-back" ' +
      'class="btn-back btn btn-lg btn-danger btn-block" ' +
      'type="button">Annuller</button>'
    ]
};

var socket = io.connect('localhost');


socket.on("SQLQueryResponse", function (data) { //Denne function står for oprettelse i tabellen
  $("#form-new-edit").css("display", "");
  removeevents();
  if ($("#tab-btn-3").hasClass("active")) {
    $(".create-pc").css("display", "block");
    $('.main #searchdiv input[type="text"]').attr("placeholder", "Søg i Computere");
    $("#tab-3").css("display", "");
    $("#tab-3").find("tr").remove();
    data.forEach(element => {
      $("#tab-3").append('<tr id="' + element.ID + '"><td>' +
        '<label class = "containers">' +
        ' <input type = "checkbox" >' +
        ' <span class = "checkmark" > </span>' +
        ' </label> ' +
        ' </td> ' +
        ' <td >' +
        ' <a class = "material-icons star" > stars </a> ' +
        ' </td> ' +
        ' <td >' + element.PCMake + ' ' + element.PCModel + '</td> ' +
        ' <td >' + element.Serial + '</td> ' +
        ' <td >' +
        ' <i class = "material-icons delete" >delete</i> ' +
        '</td></tr >');
    });
  } else if ($("#tab-btn-2").hasClass("active")) {
    $("#tab-2").css("display", "");
    $(".create-pc").css("display", "");
    $('.main #searchdiv input[type="text"]').attr("placeholder", "Søg i Klargjorte Computere");
    $("#tab-2").find("tr").remove();
    data.forEach(element => {
      $("#tab-2").append('<tr id="' + element.ID + '"><td>' +
        '<label class = "containers">' +
        ' <input type = "checkbox" >' +
        ' <span class = "checkmark" > </span>' +
        ' </label> ' +
        ' </td> ' +
        ' <td >' +
        ' <a class = "material-icons star" > stars </a> ' +
        ' </td> ' +
        ' <td >' + element.PCMake + ' ' + element.PCModel + '</td> ' +
        ' <td >' + element.Serial + '</td> ' +
        ' <td >' +
        ' <i class = "material-icons delete" >delete</i> ' +
        '</td></tr >');
    });
  } else if ($("#tab-btn-1").hasClass("active")) {
    $("#tab-1").css("display", "");
    $('.main #searchdiv input[type="text"]').attr("placeholder", "Søg i Ordrer");
    $(".create-pc").css("display", "");
    $("#tab-1").find("tr").remove();
    data[0].forEach(element => {
      $("#tab-1").append('<tr id="' + element.WID + '"><td>' +
        '<label class = "containers">' +
        ' <input type = "checkbox" >' +
        ' <span class = "checkmark" > </span>' +
        ' </label> ' +
        ' </td> ' +
        ' <td >' +
        ' <a class = "material-icons star" > stars </a> ' +
        ' </td> ' +
        ' <td >' + element.FirstName + ' ' + element.LastName + '</td> ' +
        ' <td >' + element.Mail + '</td> ' +
        ' <td >' +
        ' <i class = "material-icons delete" >delete</i> ' +
        '</td></tr >');
    });
    
  }
  addevents();
});

socket.on("DeletePCResponse", function (data) { //Denne function står for at opdatere tabellen når noget bliver slettet
  if (currenttab == "tab-1") tab1();
  else if (currenttab == "tab-2") tab2();
  else if (currenttab == "tab-3") tab3();
});


socket.on("DeleteMultiplePCResponse", function (data) { //Denne function står for at opdatere tabellen når flere ting bliver slettet
  if (currenttab == "tab-1") tab1();
  else if (currenttab == "tab-2") tab2();
  else if (currenttab == "tab-3") tab3();
});

// Opret ny PC
socket.on("RAMOptionsResponse", function (RAMdata) { //Denne function står for at tilføje ram mulighederne til formen
  Init(RAMdata);
});

socket.on("HDDOptionsResponse", function (HDDdata) { //Denne function står for at tilføje hdd mulighederne til formen
  InitHDD(HDDdata);
});

socket.on("GetTemplatesResponse", function (TemplateData) { //Denne function står for at tilføje de forskellige templates til formen
  //console.log(TemplateData);
  InitTemplates(TemplateData);
});

 socket.on("InsertTemplateResponse", function (SaveTemplate) { //Denne function gemmer nye templates 
  InitSaveTemplate(SaveTemplate);
});

 socket.on("InsertPCResponse", function (InsertPC) { //Denne function gemmer nye PC'er
    $(".tab").css("display", "");
    $("#form-new-edit").css("display", "");
    tab3();
});


socket.on("PCElementResponse", function (data){ //Denne function står for at tilføje UpdatePC data til formen
  console.log(data);
  var StatusArray = [
    {
      value: "klar til salg"
    },
    {
      value: "skrottet"
    },
    {
      value: "ny"
    }
  ];
  
  $("#form-new-edit").find("#id").val(data[0][0].ID);
  $("#form-new-edit").find("#make").val(data[0][0].PCMake);
  $("#form-new-edit").find("#model").val(data[0][0].PCModel);
  $("#form-new-edit").find("#serial").val(data[0][0].Serial);   
  $("#form-new-edit").find("#cpu").val(data[0][0].CPU);
  $("#form-new-edit").find("#ram").val(data[0][0].RAM + "GB");
  $("#form-new-edit").find("#hdd").val(data[0][0].Storage);
  $("#form-new-edit").find("#description").val(data[0][0].Description);
  StatusArray.forEach(element => {
    $("#form-new-edit").find("#status").append('<option value="' + element.value + '">' + element.value + '</option>');
  });
  $("#form-new-edit").find("#status").val(data[0][0].ItemStatus.toLowerCase());
  $("#form-new-edit").find(".form-control").each(function(){
    if($(this).attr("id") == "status")
    $(this).prop("disabled", true);
    $(this).prop("readonly", true);
    $("#form-new-edit form").attr("id","SavePC");
  $("#SavePC").off();
  $("#SavePC").on("submit", function (ev) {
    ev.preventDefault();
    if($("#form-new-edit").find("#ram").prop("readonly"))
    return;
    var data = $("#SavePC").serializeArray();
    socket.emit("UpdatePC" ,data);
    console.log(data);
});
});
});


socket.on("OrderByIDResponse", function (data) { //Denne function står for at tilføje ordrer data til formen
  $("#form-new-edit").find("#cid").val(data[0][0].CID);
  $("#form-new-edit").find("#id").val(data[0][0].WID);
  $("#form-new-edit").find("#name").val(data[0][0].FirstName + " " + data[0][0].LastName);
  $("#form-new-edit").find("#email").val(data[0][0].Mail);
  $("#form-new-edit").find("#number").val(data[0][0].Phone);
  $("#form-new-edit").find("#make").val(data[0][0].PCMake);
  $("#form-new-edit").find("#model").val(data[0][0].PCModel);
  $("#form-new-edit").find("#cpu").val(data[0][0].CPU);
  $("#form-new-edit").find("#ram").val(data[0][0].RAM + "GB");
  $("#form-new-edit").find(".form-control").each(function(){
    if($(this).attr("id") == "status")
    $(this).prop("disabled", true);
    $(this).prop("readonly", true);
  });
  $("#form-new-edit form").attr("id","SaveOrder");
  $("#SaveOrder").off();
  $("#SaveOrder").on("submit", function (ev) {
    ev.preventDefault();
    if($("#form-new-edit").find("#ram").prop("readonly"))
    return;
    var data = $("#SaveOrder").serializeArray();
    socket.emit("UpdateOrder" ,data);
    console.log(data);
});
  var sizes = data[0][0].DiskSizes.split(", ");
  var disktypes = data[0][0].DiskTypes.split(", ");
  var Diskstring = "";
  sizes.forEach((element, id) => {
    Diskstring += element + " " + disktypes[id];
    if (id != sizes.length - 1) Diskstring += ", ";
  });
  $("#form-new-edit").find("#hdd").val(Diskstring);
  $("#form-new-edit").find("#price").val(data[0][0].Price);
  $("#form-new-edit").find("#status").append('<option value="' + data[0][0].Status + '">' + data[0][0].Status + '</option>');
});

socket.on('UpdateOrderResponse', function(DATA){//Denne function står for at vise tab1 siden igen efter succesfuld opdatering af ordre
  console.log(DATA);
  $(".tab").css("display", "");
    $("#form-new-edit").css("display", "");
    tab1();
});

socket.on('UpdatePCResponse', function(DATA){//Denne function står for at vise tab1 siden igen efter succesfuld opdatering af PC
  console.log(DATA);
  $(".tab").css("display", "");
    $("#form-new-edit").css("display", "");
    if (currenttab == "tab-1") tab1();
    else if (currenttab == "tab-2") tab2();
    else if (currenttab == "tab-3") tab3();
});
//Denne her funktion står for at vise formen når man klikker på opret pc knappen
$(".create-pc").click(function () {
    CreateForm("CreatePC");
    //Hente data til form
    socket.emit("RAMOptions");
    socket.emit("HDDOptions");
    socket.emit("GetTemplates"); 

    $(".create-pc").css("display", "");
    $("#form-new-edit").css("display", "block");
    $("#tab-3").css("display", "none");
    $(".tab").css("display", "none");
});

//Denne her funktion står for at oprette PC'er / templates når submit bliver klikket i formen
$("#altform").on("submit", function (ev) {
    ev.preventDefault();
    console.log(ev);
    var data = $("#altform").serializeArray();
    $(".tab").css("display", "");
     //console.log($('#make').val());
    var name = $('#name').val();
    var make = $('#make').val();
    var model = $('#model').val();
    var serial = $('#serial').val();
    var cpu = $('#cpu').val();
    var ram = $('#ram').val();
    var hdd = $('#hdd').val();
    var desc = $('#description').val();
    var status = $('#status').val();
     if ($('#template').val() == 'ny') {
        socket.emit("SaveTemplate", {
            name: name,
            make: make,
            model: model,
            cpu: cpu,
            ram: ram,
            hdd: hdd,
            desc: desc
    });    
    }
    else
    {
        socket.emit("InsertPC", {
            make: make,
            model: model,
            serial: serial,
            cpu: cpu,
            ram: ram,
            hdd: hdd,
            desc: desc,
            status: status
        });
     }
 });


//Denne her function står for at gøre det muligt at redigere felterne i formen når man klikker på edit knappen
$(".edit-form").click(function () {
    $("#form-new-edit").find(".form-control").each(function(){
        if($(this).attr("id") == "status")
        $(this).prop("disabled", false);
        $(this).prop("readonly", false);
      });
});


//Denne her function står for at slette alle de selectede elementer når man klikker på den store skraldespand
$(".delete-selected").click(function () {
    var IDs = [];
    checkboxarr.forEach(element => {
        if (element.checked) IDs.push(element.id);
    });
    socket.emit("DeleteMultiplePC", IDs);
});


//Denne her funktion fjerner EventListeners fra alle objekter som bliver slettet fra siden
function removeevents() {
        $('tr').off();
        $('.main tr input[type="checkbox"]').off();
        $('.main table tr .delete').off();
        $(".star").off();
}


// Den her function står for at adde alle eventlisteners til de dynamiske objekter på siden
function addevents() {
    $(function () {
        //Det her kald fjerner alle Eventlisteners på de forskellige ting
        removeevents();

        //Denne her funktion står for at elementet bliver slettet når man klikker på den lille skraldespand
        $('.main table tr .delete').click(function () {
            if (currenttab == "tab-2" || currenttab == "tab-3") {
                var id = $(this).closest("tr").attr("id");
                socket.emit("DeletePC", id);
            }
        });

        //Denne her funktion står for at gøre det muligt at klikke på de forskellige emner og komme ind på en info side
        $('tr td:nth-of-type(3), tr td:nth-of-type(4)').click(function () {
            var ID = $(this).closest("tr").attr("id");
            $("#form-new-edit").css("display", "block");
            $("#" + currenttab).css("display", "none");
            $(".tab").css("display", "none");
            console.log(currenttab);
            if (currenttab == "tab-1")
                DataInserter("ShowOrder", ID);
            else
                DataInserter("ShowPC", ID);
            $(".create-pc").css("display", "none");
        });

        //Denne her funktion står for at higlighte det element man har musen henover
        $('tr').hover(function () {
            if (!$(this).find('input[type="checkbox"]').is(":checked"))
                $(this).find(".checkmark").css("background", '#ccc');
            else
                $(this).find(".checkmark").css("background", '#bbb');
            $(this).find(".star").css('color', '#ccc');
            stararr.forEach((element, ID) => {
                if (element.id == $(this).attr("id") && element.checked)
                    $(this).find(".star").css('color', 'yellow');
            });
            $(this).find(".delete").css("color", '#ccc');
        }, function () {
            $(this).find(".delete").css("color", '');
            $(this).find(".checkmark").css("background", '');
            $(this).find(".star").css('color', '');
            stararr.forEach((element, ID) => {
                if (element.id == $(this).attr("id") && element.checked)
                    $(this).find(".star").css('color', 'yellow');
            });
        });

        //Denne funktion står for at skraldespanden ud fra hver element bliver rød når musen er henover
        $('.main table tr .delete').hover(function () {
            $(this).css("color", 'rgb(255, 60, 60)');
        }, function () {
            $(this).css("color", '#ccc');
        });


        //Denne funktion står for at Ændre farven på stjernerne 
        $(".star").on("click", function () {
            console.log("hej");
            var id = -1;
            stararr.forEach((element, ID) => {
                if (element.id == $(this).closest("tr").attr("id"))
                    id = ID;
            });
            if (id == -1) {
                id = stararr.length;
                stararr.push({
                    id: $(this).closest("tr").attr("id"),
                    checked: $(this).prop("checked")
                });
            }
            if (stararr[id].checked) $(this).css("color", "");
            else $(this).css("color", "yellow");
            stararr[id].checked = !stararr[id].checked;
        });

        //Denne Click function står for at holde styr på de checkede felter og vise skraldespanden
        if (!created) {
            //created = !created;
            $('.main tr input[type="checkbox"]').click(function() {
                var checked;
                checked = $(this).prop("checked");
                var id = -1;
                checkboxarr.forEach((element, ID) => {
                    if (element.id == $(this).closest("tr").attr("id"))
                        id = ID;
                });
                if (id == -1) {
                    id = checkboxarr.length;
                    checkboxarr.push({
                        id: $(this).closest("tr").attr("id"),
                        checked: false
                    });
                }
                checkboxarr[id].checked = !checkboxarr[id].checked;
                var count = 0;
                checkboxarr.forEach((element, ID) => {
                    if (element.checked)
                        count++;
                });
                if (count > 0 && currenttab != "tab-1")
                    $(".delete-selected").css("display", "block");

                else
                    $(".delete-selected").css("display", "");
            });
        }
    });
}



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