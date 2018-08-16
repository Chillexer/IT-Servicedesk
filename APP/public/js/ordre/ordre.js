var arr = [];
window.location.pathname.split("/").forEach((element,id) => {
    if(element.includes("@")) arr.push(element);
    if(!isNaN(element) && element) arr.push(element);
});
if(arr.length > 1){
    $("#email").val(arr[0]);
    $("#id").val(arr[1]);
    Submit(null);
}





$('#orderForm').submit(function (ev){
    Submit(ev);
});

function Submit(ev) {
    if(ev){
        ev.preventDefault();
    }
        var email = $("#email").val();
        var id = $("#id").val();
        $("#email").prop("disabled",true);
        $("#orderForm").prop("disabled",true);
        $("#id").prop("disabled",true);
        var socket = io.connect('http://localhost');
        var obj = "";
        socket.emit("OrderElement", {
            id: id,
            email: email
        });
        socket.on("OrderElementResponse", function (data) {
            if (!data[0][0]) {
                alert("Ordre Findes ikke eller mailen er forkert");
                $("#email").prop("disabled",false);
                $("#id").prop("disabled",false);
                $("#orderForm").prop("disabled",false);
                return;
            }
            $("#produkter").html("");
            $("#Total").html(0);
            $("#priser").html("");
            obj = data;
            console.log(data);
            $("#order").css("display", "block");
            $("#produkter").append("<li>" + data[0][0].PCModel + "</li>");
            $("#priser").append(data[0][0].Price + "DKK");
            $("#Total").html(data[0][0].Price + parseInt($("#Total").html()));
            if (parseInt(data[0][0].RAM) > data[0][0].Size) {
                var sql = "SELECT * FROM RAMlist WHERE RAMlist.Size = '" + data[0][0].RAM + "'";
                socket.emit("SQLQuery", sql);
            }
        });
        socket.on("SQLQueryResponse", function (data) {
            $("#produkter").append("<li>" + data[0].Size + "GB RAM</li>");
            var price = data[0].Price - obj[0][0].price;
            //total += price;
            $("#priser").append("<br>" + price + "DKK");
            $("#Total").html(price + parseInt($("#Total").html()));
            $("#email").prop("disabled",false);
            $("#id").prop("disabled",false);
            $("#orderForm").prop("disabled",false);
        });
    }