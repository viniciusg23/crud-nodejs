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

function validForm(){
    const functionary = {
        name: document.getElementById("name").value,
        occupation: document.getElementById("occupation").value,
        salary: document.getElementById("salary").value
    }

    //console.log(functionary);

    if(functionary.name != '' && functionary.occupation != '' && functionary.salary != ''){
        save(functionary);
    }
}   

function save(functionary){

    functionary.salary = parseFloat(functionary.salary).toFixed(2);
    console.log(functionary);
}





function edit(id){
    console.log(id)


}

function remove(id){
    console.log(id)


}