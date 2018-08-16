var id = window.location.pathname.replace( /^\D+/g, '');

var socket = io.connect('http://localhost'); 

socket.emit("ProductElement", id);
socket.on("ProductElementResponse", function (data) {
  //$("body").append(JSON.stringify(data));
  var sizes = data[0][0].DiskSizes.split(", ");
    var disktypes = data[0][0].DiskTypes.split(", ");
    var Diskstring = "";
    sizes.forEach((element,id) => {
        Diskstring += element + " " + disktypes[id];
        if(id != sizes.length-1) Diskstring +=", "; 
    });
  $("#productName").html(data[0][0].PCMake + " " + data[0][0].PCModel);
  $("#importantStats").html(data[0][0].CPU +", " + data[0][0].Size + "GB RAM");
  $("#productPrice").html(data[0][0].Price + ",-");
  $("#descriptionBox").html(data[0][0].Description);
  $("#PCMake").html(data[0][0].PCMake);
  $("#PCModel").html(data[0][0].PCModel);
  $("#CPU").html(data[0][0].CPU);
  $("#RAM").html(data[0][0].Size + "GB RAM");
  $("#HDD").html(Diskstring);
  $("#OS").html(data[0][0].OS);
  $("#productImage").attr("src",data[0][0].Picture);
  $("#button").attr("href", "/bestilling/" + data[0][0].ID);
  console.log(data);
});