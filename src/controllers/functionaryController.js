const functionaryData = require("../models/db").functionary;


const controller = {
    all: function(req, res){
        res.json(functionaryData);
    },
    add: function(req, res){
        
        const functionary = {
            id: generateId(),
            name: req.body.name,
            occupation: req.body.occupation,
            salary: req.body.salary
        }

        //validação de dados -=-=-=-=-=-=-=-=-=-=-=-=-
        //validação do nome
        if(req.body.name != "" && req.body.name != null && req.body.name != undefined){
            for(item in functionaryData){
                if(item.name == req.body.name){
                    res.json({valid: false, message: "Já existe um funcionário com este nome cadastrado."});
                }
            }
        }
        else{
            res.json({valid: false, message: "Nome do funcionário não pode estar vazio."});
        }

        //validação da função
        if(req.body.occupation != "" && req.body.occupation != null && req.body.occupation != undefined){

        }
        else{

        }


        //salvando no "banco de dados" -=-=-=-=-=-=-=-=-=-=-=-
        functionaryData.push(functionary);

        res.json({valid: true});
    },
    edit: function(req, res){
        
    },
    remove: function(req, res){

    }
}

module.exports = controller;

function generateId(){
    return Math.random().toString(36).substring(2,9);
}