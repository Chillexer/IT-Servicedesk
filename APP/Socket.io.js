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
        socket.on('SQLQuery', function (sqlString) {
            SQL.SocketQuery(sqlString, function (err, data) {

        socket.on('HDDOptions', function () {
            SQL.GetHDDOptions(function (err, data) {
                if (err) throw err;
                socket.emit("HDDOptionsResponse", data);
            });
        });
        socket.on('OSOptions', function () {
            SQL.GetOSOptions(function (err, data) {
                if (err) throw err;
                socket.emit("OSOptionsResponse", data);
            });
        });
        socket.on('SQLQuery', function (sqlString) {
            SQL.SocketQuery(sqlString, function (err, data) {
                if (err) throw err;
                socket.emit("SQLQueryResponse", data);

            });
        });
        socket.on('DeletePC', function(ID){
            var sqlString = "UPDATE `PC` SET `ItemStatus` = 'skrottet' WHERE `PC`.`ID` = " + ID;
            SQL.SocketQuery(sqlString, function (err, data) {
                if (err) throw err;
                socket.emit("DeletePCResponse", data);
            });
        });
        socket.on('DeleteMultiplePC', function(IDs){
            var sqlString = "UPDATE `PC` SET `ItemStatus` = 'skrottet' WHERE ";
            IDs.forEach((element, id) => {
                if(id == 0) sqlString += "`PC`.`ID` = " + element;
                else sqlString += " OR `PC`.`ID` = " + element;
            });
            SQL.SocketQuery(sqlString, function (err, data) {
                if (err) throw err;
                socket.emit("DeleteMultiplePCResponse", data);
            });
        });
    }
};