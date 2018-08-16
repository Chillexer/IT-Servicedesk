
//Denne her funktion står for at vise formen når man klikker på opret pc knappen
$(".create-pc").click(function () {
    CreateForm("CreatePC");
    //Hente data til form
    socket.emit("RAMOptions");
    socket.emit("HDDOptions");
    socket.emit("GetTemplates");
    socket.emit("GetTemplateRamDisk");

    $(".create-pc").css("display", "");
    $("#form-new-edit").css("display", "block");
    $("#tab-3").css("display", "none");
    $(".tab").css("display", "none");
});

//Denne her funktion står for at oprette PC'er når submit bliver klikket i formen
$("#altform").on("submit", function (ev) {
    ev.preventDefault();
    console.log(ev);
    var data = $("#altform").serializeArray();
    $(".tab").css("display", "");
     //console.log($('#make').val());
    var name = $('#name').val();
    var make = $('#make').val();
    var model = $('#model').val();
    var cpu = $('#cpu').val();
    var ram = $('#ram').val();
    var hdd = $('#hdd').val();
    var desc = $('#description').val();
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
            if (currenttab == "tab-1")
                DataInserter("ShowOrder", ID);
            else
                DataInserter("ShowPC", ID);
        });

        //Denne her funktion står for at higlighte det element man har musen henover
        $('tr').hover(function () {
            console.log("test");
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
                if (count > 0 && currenttab != "tab-1")
                    $(".delete-selected").css("display", "block");

                else
                    $(".delete-selected").css("display", "");
            });
        }
    });
}

