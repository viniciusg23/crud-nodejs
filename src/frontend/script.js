function load(){
    fetch("http://localhost:3000/functionary/all").then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);

        fetch("http://localhost:3000/occupation/all").then((res) => {return res.json()}).then((allOccupations) =>{

            console.log(allOccupations)

            let table = document.getElementById("table-body");
            table.innerHTML = "";

            data.forEach((item) =>{

                occupation = "Indefinido";

                allOccupations.forEach((item2) =>{
                    if(item2.id == item.occupation)
                        occupation = item2.occupation;
                })


                table.innerHTML += 
                `
                <tr class="d-flex" style="width: 100%;">
                    <th scope="row" class="col-1">${item.id}</th>
                    <td class="col-4">${item.name}</td>
                    <td class="col-3">${occupation}</td>
                    <td class="col-2"><span class="fw-semibold">R$</span>${item.salary}</td>
                    <td class="col-1">
                        <a onclick="editFunctionary('${item.id}')" type="button" data-bs-toggle="modal" data-bs-target="#functionary-edit" class="w-100 d-flex justify-content-center" href="#"><img src="./icons/edit.png" width="18"></a>
                    </td>
                    <td class="col-1">
                        <a onclick="removeFunctionary('${item.id}')" class="w-100 d-flex justify-content-center" href="#"><img src="./icons/delete.png" width="20"></a>
                    </td>
                </tr>
                `
            })


        })

    })
}

load();

function loadForm(){
    let alert = document.getElementById("alert-functionary");
    alert.setAttribute("class", "d-none");

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
    let alert = document.getElementById("alert-functionary");
    alert.setAttribute("class", "d-none");

    const functionary = {
        name: document.getElementById("name").value,
        occupation: document.getElementById("occupation-select").value,
        salary: document.getElementById("salary").value
    }

    //console.log(functionary);

    if(functionary.name != '' && functionary.occupation != '' && functionary.salary != ''){
        saveFunctionary(functionary);
    }
    else{
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Informações Inválidas";
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

            // alert("Funcionário Cadastrado com Sucesso!");
        }
    });

    load();
}


//função para carregar o modal de edição dos funcionários
function editFunctionary(id){

    document.getElementById("edit-alert").setAttribute("class", "d-none");

    // console.log(id)

    document.getElementById("name-edit").value = "";
    document.getElementById("salary-edit").value = "";


    let select = document.getElementById("occupation-select-edit");

    fetch("http://localhost:3000/occupation/all").then((res) =>{return res.json()}).then((data) =>{
        select.innerHTML = "<option selected disabled value=''>Selecione um Cargo</option>";

        data.forEach((item) =>{
            select.innerHTML += `<option value="${item.id}">${item.occupation}</option>`
        })
    })

    fetch("http://localhost:3000/functionary/all").then((res) =>{return res.json()}).then((data)=>{
        data.forEach((item) =>{
            if(item.id == id){
                document.getElementById("name-edit").value = `${item.name}`;
                
            }
        })
    })

    document.getElementById("save-edit").setAttribute("onclick", `saveEdit('${id}')`);
}

function saveEdit(id){
    let alert = document.getElementById("edit-alert");

    let newOccupation = document.getElementById("occupation-select-edit").value;
    let newSalary = document.getElementById("salary-edit").value;

    if(newOccupation != '' && newSalary != ''){
        const newFunctionary = {
            id: id,
            name: document.getElementById("name-edit").value,
            occupation: newOccupation,
            salary: parseFloat(newSalary).toFixed(2)
        }

        const options = {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(newFunctionary)
        }

        fetch("http://localhost:3000/functionary/edit", options).then((res) =>{return res.json()}).then((data) =>{
            
        })

        document.getElementById("close-functionary-edit").click();
        load();

    }
    else{
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Informações Inválidas";
    }
}

function removeFunctionary(id){
    console.log(id);

    fetch(`http://localhost:3000/functionary/remove/${id}`).then((res) =>{return res.json()}).then((data)=>{
        if(data.valid){

        }
        else{

        }
    })

    load();

}




// espaco para os métodos relacionados com as funções de trabalhadores
function loadOccupation(){
    let alert = document.getElementById("occupation-alert");
    alert.setAttribute("class", "d-none");

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
    let alert = document.getElementById("occupation-alert");
    alert.setAttribute("class", "d-none");

    if(occupation != ""){
        saveOccupation({occupation: occupation})
    }
    else{
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Uma nova função não pode estar vazia";
        // alert("Cargo não pode estar vazio.");
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