var express = require("express");

var router = express.Router();

//Import the burger.js to use its database functions
var burger = require("../models/burger.js");

//Create all our routes and set up logic within those routes where required
router.get("/", function (req, res) {
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    })

})

router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        //Send back the ID of the new burger
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition " + condition)
    var devoured = 0
    if (req.body.devoured == 'true') {
            devoured = 1
        } else {
            devoured = 0
        }
    burger.updateOne({
        devoured: devoured
    }, condition, function(result) {
        if (result.changedRows == 0){
            //if no rows are changed, then the ID does not exist
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.cancelOne(condition, function(result){
        if (result.affectedRows == 0) {
            //if no rows are deleted, then the ID does not exits
            return res.status(404).end()
        } else {
            res.status(200).end();
        }
    });
});

//Export routes for server.js to use
module.exports = router;