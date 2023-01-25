const functionaryData = require("../models/db");


const controller = {
    all: function(req, res){
        res.json(functionaryData);
    },
    add: function(req, res){
        
    }
}

module.exports = controller;