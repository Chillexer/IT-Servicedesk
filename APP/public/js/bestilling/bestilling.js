var id = window.location.pathname.replace( /^\D+/g, '');

var socket = io.connect('localhost'); //skal være http://2.106.165.194 på live
socket.emit("ProductElement", id);
socket.on("ProductElementResponse", function (data) {
    var sizes = data[0][0]["DiskSizes"].split(", ");
    var disktypes = data[0][0]["DiskTypes"].split(", ");
    var Diskstring = "";
    sizes.forEach((element,id) => {
        Diskstring += element + " " + disktypes[id];
        if(id != sizes.length-1) Diskstring +=", "; 
    });
    console.log(id);

    $("#inputModel").val(data[0][0].PCMake + " " + data[0][0].PCModel + " " + data[0][0].CPU +", " + data[0][0].Size + "GB RAM");


})