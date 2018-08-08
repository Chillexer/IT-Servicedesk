var mysql = require('mysql');
module.exports ={
    SQLQuery: function (querystring, callback){
        var con = mysql.createConnection({
          host: "192.168.4.140",
          user: "root",
          password: "passw0rd",
          database: "Servicedesk"
        });
        con.connect(function (err) {
          if (err) throw err;
          con.query(querystring, function (err, data) {
            callback(err, data);
            con.end();
          });
        });
      },
      GetOrder: function(Criteria,callback){
        this.SQLQuery("CALL GetOrder("+ Criteria.id+ ",'"+Criteria.email +"')", function (err, data) {
          callback(err, data);
        });
      },
      GetShopElements: function(callback) {
        this.SQLQuery("CALL GetShopElements()", function (err, data) {
          callback(err, data);
        });
      },
      GetProduct: function(ID,callback) {
          this.SQLQuery("CALL GetProduct("+ ID +")", function (err, data) {
            callback(err, data);
          });
      },
      SocketQuery: function(sql,callback){
        this.SQLQuery(sql, function (err, data) {
          callback(err, data);
        });
      },
      InsertOrder: function(body,Callback){
        var model = body.model;
        var storage = body.storage;
        var RAM = body.RAM;
        var OS = body.OS;
        var customerID = "3";
        var showroomID = "1";
        var firstname = body.firstname;
        var lastname = body.lastname;
        var address = body.address;
        var mail = body.mail;
        var phone = body.phone;
        var NewOrder = {model: model, storage: storage, RAM: RAM, OS: OS, firstname: firstname, lastname: lastname, address: address, mail: mail, phone: phone};
    
        var SQLQuery = this.SQLQuery;
        var sql = "INSERT INTO Customer (FirstName, LastName, Address, Phone, Mail) VALUES ('"+firstname+"', '"+lastname+"', '"+address+"', '"+phone+"', '"+mail+"')";
        SQLQuery(sql,function(err,data){
            if (err) throw err;
            else{
            var sql = "INSERT INTO Waitinglist (CustomerID, ShowroomID, RAM, Lagring) VALUES ('"+customerID+"', '"+showroomID+"', '"+RAM+"', '"+storage+"')";
            SQLQuery(sql,function(err,data){
                if (err) throw err;
                else console.log("1 record inserted");
                Callback(err,data);
            });
        }
        });
      }
}