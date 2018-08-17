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
        socket.on('PCElement', function (ID) {
            SQL.GetPC(ID, function (err, data) {
                if (err) throw err;
                socket.emit("PCElementResponse", data);
            });
        });
        socket.on('UpdatePC', function (data){
            console.log(data);
            var sqlString = "CALL UpdatePCByID("+ data[0].value +
            ", '"+data[1].value+
            "', '"+data[2].value+
            "', '"+data[3].value+
            "', '"+data[4].value+
            "', '"+data[5].value.replace(/\D/g,'')+
            "', '"+data[6].value+
            "', '"+data[7].value+
            "', '"+data[8].value+"')";
            console.log(sqlString);
            SQL.SocketQuery(sqlString, function (err, data) {
                if (err) throw err;
                socket.emit("UpdatePCResponse", data);
             });
        });
        socket.on('OrderByID', function (sqlString) {
            SQL.SocketQuery(sqlString, function (err, data) {
                if (err) throw err;
                socket.emit("OrderByIDResponse", data);
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
        socket.on('HDDOptions', function () {
            SQL.GetHDDOptions(function (err, data) {
                if (err) throw err;
                socket.emit("HDDOptionsResponse", data);
            });
        });
        socket.on('GetTemplates', function () {
            SQL.GetTemplates(function (err, data) {
                if (err) throw err;
                socket.emit("GetTemplatesResponse", data);
            });
        });
        socket.on('InsertPC', function (PCinput) {
            SQL.InsertPC(PCinput, function (err, data) {
                if (err) throw err;
                socket.emit("InsertPCResponse", data);
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
        socket.on('UpdateOrder', function(DATA){
            var sqlString = "CALL UpdateOrderByID("+ DATA[1].value +
            ", '"+DATA[2].value.split(" ")[0]+
            "', '"+DATA[2].value.split(" ")[1] + 
            "', "+DATA[8].value.replace(/\D/g,'')+
            ", '"+DATA[11].value+
            "', '"+DATA[3].value+
            "', '"+DATA[4].value+
            "', "+DATA[0].value+")";
            SQL.SocketQuery(sqlString, function (err, data) {
                if (err) throw err;
                socket.emit("UpdateOrderResponse", data);
            });
        });
        socket.on('GetTemplateRamDisk', function () {
            SQL.GetTemplates(function (err, data) {
                if (err) throw err;
                socket.emit("GetTemplateRamDiskResponse", data);
            });
        });
        socket.on('SaveTemplate', function (input) {
            SQL.SaveTemplate(input, function (err, data) {
                if (err) throw err;
                socket.emit("SaveTemplateResponse", data);
            });
        });

    }
};
