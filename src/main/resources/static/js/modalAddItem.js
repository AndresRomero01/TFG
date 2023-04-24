const modalDeletePlato = new bootstrap.Modal(document.querySelector('#modalAddItem'));


"use strict"


document.getElementById("buttonFormConfirm").addEventListener("click", newItem)

//cambia la previsualizacion de la imagen a subir de un nuevo item
document.querySelector("#fileFieldImgItem").onchange = e => {
    console.log("imagen suida");
    let img = document.querySelector("#newImgItem");
    let fileInput = document.querySelector("#fileFieldImgItem");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};

//cambia la previsualizacion de la imagen a subir de un nuevo item
document.querySelector("#fileFieldImgItemM").onchange = e => {
    console.log("imagen suida");
    let img = document.querySelector("#newImgItemM");
    let fileInput = document.querySelector("#fileFieldImgItemM");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};


function newItem(){

    const myForm = document.getElementById("addItemForm");

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
        return null;
    }

    let formData = new FormData();

    let itemName = document.getElementById("itemNameField").value;
    let itemQuantity = document.getElementById("itemQuantityField").value;

    let itemDesc = document.getElementById("itemDescField").value;

    let itemMaxLoan = document.getElementById("itemMaxLoanField").value;

    let img = document.querySelector("#newImgItem");

    console.log("name : " + itemName + " quantity: "+ itemQuantity + " desc: " + itemDesc + " maxLoan: "+ itemMaxLoan);

    formData.append("itemName", itemName);
    formData.append("itemQuantity", itemQuantity);
    formData.append("itemDesc", itemDesc);
    formData.append("itemMaxLoan", itemMaxLoan);
    formData = appendImageToFomData(formData, img, "itemImg");


    go("/items/addNewItem", "POST", formData, {}).then(d => {
        console.log(d);


    }).catch(() => console.log("fallo"));

}