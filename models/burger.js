//Import ORM to create functions that will interact with the burgers_db;
var orm = require("../config/orm.js");

// code that will call the ORM functions using burger specific input for the ORM.
var burgers = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },
    cancelOne: function(condition, cb) {
        orm.cancelOne("burgers", condition, function(res) {
            cb(res);
        });
    }
};

//Export the database functions for the controller (burgersController.js)
module.exports = burgers;