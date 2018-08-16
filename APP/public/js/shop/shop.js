var socket = io.connect('http://localhost'); //skal være http://2.106.165.194 på live

socket.emit("ShopElements", "hey");
socket.on("ShopElementResponse", function (data) {
  data[0].forEach(element => {
      CreateShopItem(element);
  });
});


function CreateShopItem(data){
    var sizes = data.DiskSizes.split(", ");
    var disktypes = data.DiskTypes.split(", ");
    var Diskstring = "";
    sizes.forEach((element,id) => {
        Diskstring += element + " " + disktypes[id];
        if(id != sizes.length-1) Diskstring +=", "; 
    });

var temp = '<div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 d-flex align-items-stretch">' +
'<div class="card border-dark my-5">' +
'<img class="card-img-top" src="'+data.Picture+'" alt="Card image cap">' +
'<div class="card-body">' +
'<h5 class="card-title">'+data.PCMake + ' ' +data.PCModel +'</h5></div>' +
'<div class="card-footer">' +
'<p class="card-text">'+ 'OS: '+ data.OS + '<br>CPU: ' + data.CPU + '<br>RAM: '+ data.Size +'<br>Lagring: '+ Diskstring +'</p>' +
'<div class="text-center">' +
'<a href="/product/'+ data.ID +'" class="btn btn-primary" style="width: 100%;">Mere Info</a>' +
'</div></div></div></div>';
$(".row").append(temp);
}