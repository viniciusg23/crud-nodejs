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
                    return;
                }
            }
        }
        else{
            res.json({valid: false, message: "Nome do funcionário não pode estar vazio."});
            return;
        }

        //validação da função
        if(req.body.occupation == "" && req.body.occupation == null && req.body.occupation == undefined){
            res.json({valid: false, message: "Cargo do funcionário não pode estar vazio."});
            return;
        }

        if(req.body.salary == "" && req.body.salary == null && req.body.salary == undefined){
            res.json({valid: false, message: "Salário do funcionário não pode estar vazio."});
            return;
        }


        //salvando no "banco de dados" -=-=-=-=-=-=-=-=-=-=-=-
        functionaryData.push(functionary);

        res.json({valid: true, message: "Funcionário cadastrado com sucesso."});
    },
    edit: function(req, res){
        for(i = 0; i < functionaryData.length; i++){
            if(functionaryData[i].id == req.body.id){
                functionaryData[i].occupation = req.body.occupation;
                functionaryData[i].salary = req.body.salary;
            }
        }

        res.json({valid: true, message: "Funcionário editado com sucesso."})
    },
    remove: function(req, res){

        for(i = 0; i < functionaryData.length; i++){
            if(functionaryData[i].id == req.params.id){
                functionaryData.splice(i, 1);
                res.json({valid: true, message: "Funcionário removido com sucesso."});
                return;
            }
        }

        res.json({valid: false, message: "Funcionário não encontrado."});
    }
}

module.exports = controller;

function generateId(){
    return Math.random().toString(36).substring(2,6);
}