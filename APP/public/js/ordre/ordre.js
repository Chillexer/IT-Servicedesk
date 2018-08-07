$('#orderForm').submit(function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    var email = $("#email").val();
    var id = $("#id").val();
    var socket = io.connect('http://192.168.0.63'); 
    socket.emit("OrderElement", {id:id,email:email});
    socket.on("OrderElementResponse", function (data) {
        console.log(data);

    });
    /* Validations go here */
    this.submit(); // If all the validations succeeded
});