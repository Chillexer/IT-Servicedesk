var id = window.location.pathname.replace( /^\D+/g, '');

var socket = io.connect('http://192.168.0.63'); //skal være http://2.106.165.194 på live

socket.emit("ProductElement", id);
socket.on("ProductElementResponse", function (data) {
  //$("body").append(JSON.stringify(data));
  console.log(data);
});