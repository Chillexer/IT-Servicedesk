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
    addevents();
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
    addevents();
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
    addevents();
  }
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
  InitTemplates(TemplateData);
});

socket.on("GetTemplateRamDiskResponse", function (TemplateRamDisk) { //Denne function står for at hente template information til formen
  InitTemplatesRamDisk(TemplateRamDisk);
});

socket.on("InsertTemplateResponse", function (SaveTemplate) { //Denne function gemmer nye templates 
  InitSaveTemplate(SaveTemplate);
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

socket.on("ProductElementResponse", function (data) { //Denne function står for at tilføje pc data til formen
  console.log(data);
});

socket.on('UpdateOrderResponse', function(DATA){//Denne function står for at vise tab1 siden igen efter succesfuld opdatering af ordre
  console.log(DATA);
  $(".tab").css("display", "");
    $("#form-new-edit").css("display", "");
    tab1();
});