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

$("#altform").on("submit", function (ev) {
    ev.preventDefault();
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
    socket.emit("DeleteMultiplePC", IDs);
});

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
            $("#" + currenttab).css("display", "none");
            $(".tab").css("display", "none");
            if (currenttab == "tab-1")
                DataInserter("ShowOrder", ID);
            else
                DataInserter("ShowPC", ID);
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