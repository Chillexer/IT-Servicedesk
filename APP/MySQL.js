var mysql = require('mysql');
module.exports = {
  SQLQuery: function (querystring, callback) {
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
  SaveTemplate: function (tempinput, callback) {
    this.SQLQuery("CALL InsertTemplate('"+tempinput.name+"', '"+tempinput.make+"', '"+tempinput.model+"', '"+tempinput.cpu+"', '"+tempinput.ram+"', '"+tempinput.hdd+"','"+tempinput.desc+"')", function (err, data) {
      callback(err, data);
    });
  },
    InsertPC: function (PCinput, callback) {
      var sql = "CALL InsertPC('"+PCinput.make+"', '"+PCinput.model+"', '"+PCinput.serial+"', '"+PCinput.cpu+"', '"+PCinput.ram+"', '"+PCinput.hdd+"','"+PCinput.desc+"', '"+PCinput.status+"')";
      this.SQLQuery(sql, function (err, data) {
        callback(err, data);
    });
  },
  GetOrder: function (Criteria, callback) {
    this.SQLQuery("CALL GetOrder(" + Criteria.id + ",'" + Criteria.email + "')", function (err, data) {
      callback(err, data);
    });
  },
  GetShopElements: function (callback) {
    this.SQLQuery("CALL GetShopElements()", function (err, data) {
      callback(err, data);
    });
  },
  GetProduct: function (ID, callback) {
    this.SQLQuery("CALL GetProduct(" + ID + ")", function (err, data) {
      callback(err, data);
    });
  },
  GetPC: function (ID, callback) {
    this.SQLQuery("CALL GetPC(" + ID + ")", function (err, data) {
      callback(err, data);
    });
  },
  UpdatePCByID: function (sqlString, callback) {
    this.SQLQuery(sqlStr+ing, function (err, data) {
      callback(err, data);
    });
  },
  GetRAMOptions: function (callback) {
    this.SQLQuery("CALL GetRAMOptions()", function (err, data) {
      callback(err, data);
    });
  },
  GetHDDOptions: function (callback) {
    this.SQLQuery("CALL GetHDDOptions()", function (err, data) {
      callback(err, data);
    });
  },
  GetOSOptions: function (callback) {
    this.SQLQuery("CALL GetOSOptions()", function (err, data) {
      callback(err, data);
    });
  },
  GetTemplates: function (callback) {
    this.SQLQuery("CALL GetTemplates()", function (err, data) {
      callback(err, data);
    });
  },
  SocketQuery: function (sql, callback) {
    this.SQLQuery(sql, function (err, data) {
      callback(err, data);
    });
  },
  InsertOrder: function (body, Callback) {
    var model = body.model;
    var storage = body.storage;
    var RAM = body.RAM;
    var OS = body.OS;
    var showroomID = body.showroomid;
    var firstname = body.firstname;
    var lastname = body.lastname;
    var address = body.address;
    var mail = body.mail;
    var phone = body.phone;
    var status = "Ny";

    this.SQLQuery("CALL InsertOrder( '" + firstname + "', '" + lastname + "', '" + address + "', '" + phone + "', '" + mail + "', " + showroomID + ", " + RAM + ", '" + storage + "', '" + OS + "', '" + status + "')", function (err, data) {
      Callback(err, data);
    });
  }
};