var id = window.location.pathname.replace( /^\D+/g, '');
var RAMData;

var socket = io.connect('localhost');
socket.emit("RAMOptions");
socket.on("RAMOptionsResponse", function (RAMdata) {
    socket.emit("ProductElement", id);
    socket.on("ProductElementResponse", function (data) {
     Init(data,RAMdata);   
    })
});
function Init(data,RAMdata){
    var sizes = data[0][0]["DiskSizes"].split(", ");
    var disktypes = data[0][0]["DiskTypes"].split(", ");
    var Diskstring = "";
    sizes.forEach((element,id) => {
        Diskstring += element + " " + disktypes[id];
        if(id != sizes.length-1) Diskstring +=", "; 
    });
    
    //Insert PC details in form
    $("#inputModel").val(data[0][0].PCMake + " " + data[0][0].PCModel + " " + data[0][0].CPU +", " + data[0][0].Size + "GB RAM");

    var sizes = data[0][0].DiskSizes.split(", ");
    var disktypes = data[0][0].DiskTypes.split(", ");
    var Diskstring = "";
    sizes.forEach((element,id) => {
        Diskstring += element + " GB " + disktypes[id];
        if(id != sizes.length-1) Diskstring +=", "; 
    });
    $("#inputlagerplads").val(Diskstring);

    console.log(RAMdata);
    //console.log((data[0][0].Size));
    $('#inputRAM').append('<option value="'+data[0][0].Size+'">'+data[0][0].Size+ ' GB RAM'+ '</option>');

    RAMdata[0].forEach((element, id) => {
        console.log(element);
        if (element.Size > data[0][0].Size) {
            $('#inputRAM').append('<option value="'+element.Size+'">'+element.Size+ ' GB RAM'+ '</option>');
        }
    });


//     console.log($('#inputRAM').eq(0).text());
//     console.log($('#inputRAM').options[0].text);

//     // Insert PC details in form
//     $("#inputModel").val(data[0][0].PCMake + " " + data[0][0].PCModel + " " + data[0][0].CPU +", " + data[0][0].Size + "GB RAM");
    
//     var i;
//     for (i = 0; i < $('#inputRAM').length; i++) {
//         if ($('#inputRAM').options[i] < data[0][0].Size)
//         {
//             $('#inputRAM').remove(i);
//         }
//     }

//     $('#inputRAM').val(data[0][0].Size);
 }
