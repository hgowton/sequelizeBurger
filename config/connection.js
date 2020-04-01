//Set up connection to mysql
var mysql = require("mysql");

var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "test",
        password: "",
        database: "burgers_db"
    });


//Create the connection to the burgers_db in mysql
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//Export connection for ORM to use
module.exports = connection;