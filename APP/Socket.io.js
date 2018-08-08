var SQL = require('./MySQL');
module.exports = {
    Sockets: function (socket) {
        socket.on('ShopElements', function () {
            SQL.GetShopElements(function (err, data) {
                if (err) throw err;
                socket.emit("ShopElementResponse", data);
            });
        });
        socket.on('ProductElement', function (ID) {
            SQL.GetProduct(ID, function (err, data) {
                if (err) throw err;
                socket.emit("ProductElementResponse", data);
            });
        });
        socket.on('OrderElement', function (Criteria) {
            SQL.GetOrder(Criteria, function (err, data) {
                if (err) throw err;
                socket.emit("OrderElementResponse", data);
            });
        });

        socket.on('RAMOptions', function () {
            SQL.GetRAMOptions(function (err, data) {
                if (err) throw err;
                socket.emit("RAMOptionsResponse", data);
            });
        });
        socket.on('SQLQuery', function (sqlstring) {
            SQL.SocketQuery(sqlstring, function (err, data) {
                if (err) throw err;
                socket.emit("SQLQueryResponse", data);

            });
        });
    }
}