var stararr = [];
var checkboxarr = [];
var tab = 1;
var created = false;
var currenttab = "tab-1";

function removeevents() {
  $(function () {
    $('tr').off();
    $('.main tr input[type="checkbox"]').off();
    $('.main table tr .delete').off();
    $(".star").off();
  });
}

function addevents() {
  $(function () {
    $('tr').off();
    $('.main tr input[type="checkbox"]').off();
    $('.main table tr .delete').off();
    $(".star").off();
    $('.main table tr .delete').click(function () {
      if (currenttab == "tab-2" || currenttab == "tab-3") {
        var id = $(this).closest("tr").attr("id");
        socket.emit("DeletePC", id);
      }
    });
    $('tr td:nth-of-type(3), tr td:nth-of-type(4)').click(function () {
       var ID = $(this).closest("tr").attr("id");
       $("#form-new-edit").css("display", "block");
       $("#"+ currenttab).css("display", "none");
      $(".tab").css("display", "none");
      $("#form-new-edit").find("#inputMake").val(ID);
    });
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
    $('.main table tr .delete').hover(function () {
      $(this).css("color", 'rgb(255, 60, 60)');
    }, function () {
      $(this).css("color", '#ccc');
    });
    $(".star").on("click", function () {
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
    if (!created) {
      //created = !created;
      $('.main tr input[type="checkbox"]').click(function test() {
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
        if (count > 0)
          $(".delete-selected").css("display", "block");

        else
          $(".delete-selected").css("display", "");
      });
    }
  });
}

function changeTab(evt, tabname) {
  // Declare all variables
  var i, tabcontent, tablinks;
  currenttab = tabname;
  console.log(currenttab);
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

var socket = io.connect('http://192.168.0.63');


socket.on("DeletePCResponse", function (data) {
  if (currenttab == "tab-1") tab1();
  else if (currenttab == "tab-2") tab2();
  else if (currenttab == "tab-3") tab3();
});

socket.on("DeleteMultiplePCResponse", function (data) {
  if (currenttab == "tab-1") tab1();
  else if (currenttab == "tab-2") tab2();
  else if (currenttab == "tab-3") tab3();
});




socket.on("SQLQueryResponse", function (data) {
  $("#form-new-edit").css("display", "");
  removeevents();
  if ($("#tab-btn-3").hasClass("active")) {
    $(".create-pc").css("display", "block");
    $('.main #searchdiv input[type="text"]').attr("placeholder", "Søg i Computere");
    $("#tab-3").css("display", "");
    console.log(data);
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

$(".create-pc").click(function () {
  //Hente data til form
  $(".create-pc").css("display", "");
  $("#form-new-edit").css("display", "block");
  $("#tab-3").css("display", "none");
  $(".tab").css("display", "none");
});
//Form ved submit
$("#newproductform").on("submit", function (ev) {
  ev.preventDefault();
  var data = $("#newproductform").serializeArray();
  $(".tab").css("display", "");
});
$(".close-form, #btn-back").click(function () {
  $(".tab").css("display", "");
  if (currenttab == "tab-1") tab1();
  else if (currenttab == "tab-2") tab2();
  else if (currenttab == "tab-3") tab3();
});

$(".delete-selected").click(function () {
  var IDs = [];
  checkboxarr.forEach(element => {
    if (element.checked) IDs.push(element.id);
  });
  console.log(IDs);
  socket.emit("DeleteMultiplePC", IDs);
});


tab1();