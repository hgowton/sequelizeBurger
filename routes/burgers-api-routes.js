//api-routes.js - this file offers a set of routes for displaying and saving data to the db

//Dependencies ============================

//Requiring our models
var db = require("../models");

//Routes ===========================
module.exports = function(app) {
    //GET route for getting all of the burgers
    app.get("/api/burgers", function (req, res) {
        var query = {};
        if (req.query.customer_id) {
            query.CustomerId = req.query.customer_id;
        }
        //completes a left outer join to the db.Customer
        db.Burgers.findAll({
            where: query,
            include: [db.Customer]
        }).then(function(dbBurger) {
            res.json(dbBurger);
        });
    });

    //GET route for retrieving a single burger order
    app.get('api/burgers/:id', function(req, res) {
        db.Burgers.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Customer]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    //POST route for saving a new burger
    app.post('/api/burgers', function(req, res) {
        db.Burgers.create(req.body).then(function(dbBurger) {
            res.json(dbBurger);
        });
    });

    //DELETE route for deleting posts
    app.delete('/api/burgers/:id', function(req, res) {
        db.Burgers.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBurger) {
            res.json(dbBurger)
        });
    });

    //PUT route for updating posts
    app.put('/api/burgers', function(req, res) {
        db.Burgers.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }.then(function(dbBurger) {
                    res.json(dbBurger);
                })
            });
    });
};