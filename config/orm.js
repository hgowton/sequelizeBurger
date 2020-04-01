//Import mysql connection
var connection = require("../config/connection.js");


//Creates an array of three ? marks in a string to help with MYSQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i=0; i<num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

//Converts object key/value pairs to SQL syntax (helper function)
function objToSql(ob) {
    var arr = [];
    //loops through keys and pushes the key/value as a string into array
    for (var key in ob) {
        var value = ob[key];
        //skips hidden properties
        if(Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf("") >= 0) {
                value = "'" + value + "'";
            }

            //example {buger: 'Soprano'} => ["burger ='Soprano'"]
            //example {devour: true} => ["devour: true"]
            arr.push(key + "=" + value);
        }
    }
    //translate array of strings to a single comma-separated string
    return arr.toString();
}

//INSTRUCTIONS Create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

//Object for all orm statments for MYSQL to use
//Will be exported at the end of orm file
var orm = {

    //function enables user to see all of the orders
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) { 
                throw err;
            }
            cb(result);
        });
    },
    //function enables user to add a burger to the list
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        
        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //function enables user to modify a previously ordered burger
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    //enables user to cancel order
    //EXTRA EXTRA NOTE NOTE ---------- delete function in cats
    cancelOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;

        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

//Export orm object to for use by burgers.js
module.exports = orm;