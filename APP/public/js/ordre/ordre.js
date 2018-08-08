$('#orderForm').submit(function (ev) {
    ev.preventDefault(); // to stop the form from submitting
    var email = $("#email").val();
    var id = $("#id").val();
    var socket = io.connect('http://192.168.0.63');
    var obj = "";
    socket.emit("OrderElement", {
        id: id,
        email: email
    });
    socket.on("OrderElementResponse", function (data) {
        if (!data[0][0]) {
            alert("Ordre Findes ikke eller mailen er forkert");
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
    });
});