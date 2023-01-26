function load(){
    fetch("http://localhost:3000/functionary/all").then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);

        let table = document.getElementById("table-body");
        table.innerHTML = "";

        data.forEach((item) =>{
            table.innerHTML += 
            `
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td>${item.occupation}</td>
                <td>${item.salary}</td>
                <td class="">
                    <a onclick="edit('${item.id}')" class="w-100 d-flex justify-content-center"><img src="./icons/edit.png" width="18"></a>
                </td>
                <td>
                    <a onclick="remove('${item.id}')" class="w-100 d-flex justify-content-center "><img src="./icons/delete.png" width="20"></a>
                </td>
            </tr>
            `
        })

    })
}

load();

function loadForm(){
    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";


    let select = document.getElementById("occupation-select");

    fetch("http://localhost:3000/occupation/all").then((res) =>{return res.json()}).then((data) =>{
        select.innerHTML = "<option selected disabled>Selecione um Cargo</option>";

        data.forEach((item) =>{
            select.innerHTML += `<option value="${item.id}">${item.occupation}</option>`
        })
    })
}

function validFunctionary(){
    const functionary = {
        name: document.getElementById("name").value,
        occupation: document.getElementById("occupation-select").value,
        salary: document.getElementById("salary").value
    }

    //console.log(functionary);

    if(functionary.name != '' && functionary.occupation != '' && functionary.salary != ''){
        saveFunctionary(functionary);
    }
}   

function saveFunctionary(functionary){

    functionary.salary = parseFloat(functionary.salary).toFixed(2);

    const options =  {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(functionary)
    }

    fetch("http://localhost:3000/functionary/add", options).then(res =>{
        return res.json();
    }).then((result) =>{
        if(result.valid){
            document.getElementById("close-functionary").click();

            alert("Funcionário Cadastrado com Sucesso!");
        }
    });

    load();
}



function edit(id){
    console.log(id)


}

function remove(id){
    console.log(id)


}




// espaco para os métodos relacionados com as funções de trabalhadores
function loadOccupation(){
    let list = document.getElementById("occupation-list");
    document.getElementById("new-occupation").value = "";

    fetch("http://localhost:3000/occupation/all").then((res) => {return res.json()}).then((data) =>{
        list.innerHTML = "";

        data.forEach((item) =>{
            list.innerHTML += 
            `
            <li class="list-group-item d-flex justify-content-between">
                <p class="mb-0">${item.occupation}</p>
                <a onclick="removeOccupation('${item.id}')" class="d-flex aling-items-center" href="#"><img src="./icons/delete.png" width="20"></a>
            </li>
            `
        })
    })
}

function validOccupation(){
    let occupation = document.getElementById("new-occupation").value;

    if(occupation != ""){
        saveOccupation({occupation: occupation})
    }
    else{
        alert("Cargo não pode estar vazio.");
    }
}

function saveOccupation(occupation){
    const options =  {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(occupation)
    }

    fetch("http://localhost:3000/occupation/add", options).then(res =>{
        return res.json();
    }).then((result) =>{
        
        console.log(result);

        if(!result.valid)
            alert(`ERRO: ${result.message}`);
    });


    loadOccupation();
}

function removeOccupation(id){

    fetch(`http://localhost:3000/occupation/remove/${id}`).then(res =>{
        return res.json();
    }).then((result) =>{
        
        console.log(result);

        if(!result.valid)
            alert(`ERRO: ${result.message}`);
    });

    loadOccupation();
}