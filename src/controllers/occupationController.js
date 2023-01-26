const occupationData = require("../models/db").occupation;

const controller = {
    all: function(req, res){
        res.json(occupationData);
    },
    add: function(req, res){

        const occupation = {
            id: generateId(),
            occupation: req.body.occupation
        }

        //validação dos dados
        if(req.body.occupation != "" && req.body.occupation != null && req.body.occupation != undefined){
            for(item in occupationData){
                if(item.occupation == req.body.occupation){
                    res.json({valid: false, message: "Já existe um cargo semelhante cadastrado."});
                }
            }
        }
        else{
            res.json({valid: false, message: "Nome do cargo não pode estar vazio."});
        }

        //adicionando um novo cargo no "banco de dados"
        occupationData.push(occupation);
    },
    remove: function(req, res){

        //removendo um cargo do "banco de dados"
        for(i = 0; i < occupationData.length; i++){
            if(occupationData[i].id == req.params.id){
                occupationData.splice(i, 1);
            }
        }

        res.json({valid: true, message: "Cargo removido com sucesso."});
    }
}


module.exports = controller;


function generateId(){
    return Math.random().toString(36).substring(2,9);
}