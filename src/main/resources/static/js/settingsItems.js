const modalAddItem = new bootstrap.Modal(document.querySelector('#modalAddItem'));
const modalModifyItem = new bootstrap.Modal(document.querySelector('#modalModifyItem'));
const modalModifyItemImg = new bootstrap.Modal(document.querySelector('#modalModifyItemImg'));

"use strict"



let itemImgToModify = -1;
//TODO cargar la lista de material de la bd al reves para mostrar primero los mas nuevos
//TODO hacer lo mismo con el borrado, que se debera llamar despues de modificar la ui
function setModifyButtonListeners()
{
    let buttonsModifyItem = [];
    buttonsModifyItem = document.querySelectorAll(".itemButtonModify")
    for(let i = 0; i < buttonsModifyItem.length; i++)
    {
        buttonsModifyItem[i].addEventListener("click", openModalModifyItem)
    }

    let buttonsModifyImg = []
    buttonsModifyImg = document.querySelectorAll(".editImgButton");
    for(let i = 0; i < buttonsModifyImg.length; i++)
    {
        buttonsModifyImg[i].addEventListener("click", setIdItemImgToModify)
    }

    let buttonsDelete = []
    buttonsDelete = document.querySelectorAll(".deleteItem");
    for(let i = 0; i < buttonsDelete.length; i++)
    {
        buttonsDelete[i].addEventListener("click", deleteItem)
    }

}

function setIdItemImgToModify(e)
{
    
    itemImgToModify = e.target.value;
}

setModifyButtonListeners();
//cambia la previsualizacion de la imagen a subir de un nuevo item
document.querySelector("#fileFieldImgItemM").onchange = e => {
    console.log("imagen suida");
    let img = document.querySelector("#newImgItemM");
    let fileInput = document.querySelector("#fileFieldImgItemM");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};

//cambia la previsualizacion de la imagen a subir de un nuevo item
document.querySelector("#fileFieldImgItem").onchange = e => {
    console.log("imagen suida");
    let img = document.querySelector("#newImgItem");
    let fileInput = document.querySelector("#fileFieldImgItem");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};

let idToModify = -1;
let itemToModifyContainer;

function openModalModifyItem(e)
{
   
   // createNewItemUI()
   console.log("aqui2")
    let id ="";
    id = e.target.value;
    idToModify = id;

    itemToModifyContainer =  e.target.closest(".itemRow");

    console.log("closest: " + itemToModifyContainer)

    let desc = document.querySelector("#itemDesc"+id).textContent
    let name = document.querySelector("#itemName"+id).textContent
    let imgSrc =  document.querySelector("#itemImg"+id).src;
    let maxLoan = document.querySelector("#itemMaxLoan"+id).value;
    let quantity = document.querySelector("#itemQuantity"+id).value;
    console.log(maxLoan);

    document.querySelector("#itemNameFieldM").value = name;
    document.querySelector("#itemDescFieldM").value = desc;
    document.querySelector("#newImgItemM").src =imgSrc;
    document.querySelector("#itemMaxLoanFieldM").value = maxLoan;
    document.querySelector("#itemQuantityFieldM").value = quantity;

   // img.classList.remove("itemImg"); cambia el original. Crear el html y sobre ese quitar la clase
    console.log(imgSrc);

    
    console.log(desc);


}


document.getElementById("buttonFormConfirmItem").addEventListener("click", newItem)

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
        modalAddItem.hide();

        createNewItemUI(d["idItem"]);




    }).catch(() => console.log("fallo"));

}

function createNewItemUI(itemId)
{
  /*   console.log("aqui");
    let newHtml = document.getElementById('baseItem').cloneNode(true);
    console.log("aqui2");
    console.log("elemento " + newHtml);

    console.log(newHtml.querySelector("itemName")) */
    console.log("aqui");
    let itemName = document.getElementById("itemNameField").value;
    let itemQuantity = document.getElementById("itemQuantityField").value;

    let itemDesc = document.getElementById("itemDescField").value;

    let itemMaxLoan = document.getElementById("itemMaxLoanField").value;

    let imgSrc = document.querySelector("#newImgItem").src;
    
    let htmlnewItem = '<div class="row itemRow">'+
                        '<div class="col-3">'+
                            '<div class="itemImgContainer">'+
                            '<span>'+
                                '<img id="itemImg'+itemId+'" class="itemImg" src="'+imgSrc+'">'+
                                '<button value="'+itemId+'" data-bs-toggle="modal" data-bs-target="#modalModifyItemImg" class="editImgButton">✏️</button>'+
                            '</span>'+
                            '</div>'+
                        '</div>'+
                        
                        '<div class="col">'+
                            '<div class="row itemHeader">'+
                                '<div class="col-4">'+
                                    '<p id="itemName'+itemId+'" class="">'+itemName+'</p>'+
                                '</div>'+
                                '<div class="col-4 offset-4">'+
                                    '<p id="itemQuantityText'+itemId+'" class="">Unidades: '+itemQuantity+'</p>'+
                                    '<input type="hidden" id="itemQuantity'+itemId+'" value="'+itemQuantity+'">'+
                                '</div>'+
                            '</div>'+
                            
                            '<div class="itemDescContainer">'+
                                '<p id="itemDesc'+itemId+'" class="itemDescText">'+itemDesc+'</p>'+
                            '</div>'+
                            '<p id="itemMaxLoanText'+itemId+'" class="itemMaxLoan">Cantidad maxima que un usuario puede alquilar a la vez: '+itemMaxLoan+'</p>'+
                            '<input type="hidden" id="itemMaxLoan'+itemId+'" value="'+itemMaxLoan+'">'+
                        '</div>'+

                        '<div class="col-1">'+
                            '<div class="itemButtonsContainer">'+
                                '<button class="btn itemButtonModify" value="'+itemId+'" data-bs-toggle="modal" data-bs-target="#modalModifyItem">Modificar</button>'+
                                '<button class="btn itemButtonDelete">Eliminar</button>'+
                            '</div>'+       
                        '</div>'+
                    '</div>';

    let container = document.querySelector("#itemsContainer");
    console.log(container)

    container.innerHTML = htmlnewItem + container.innerHTML;

    setModifyButtonListeners();
    const myForm = document.getElementById("addItemForm");

    myForm.reset();
    

    console.log("acabado");
}

document.getElementById("buttonFormConfirmItemM").addEventListener("click", modifyItem)

function modifyItem(){

    const myForm = document.getElementById("modifyItemForm");

   // document.querySelector("#fileFieldImgItemM").value = "a";
    
    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {

        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
        return null;
    }

    let formData = new FormData();

    let itemName = document.getElementById("itemNameFieldM").value;
    let itemQuantity = document.getElementById("itemQuantityFieldM").value;

    let itemDesc = document.getElementById("itemDescFieldM").value;

    let itemMaxLoan = document.getElementById("itemMaxLoanFieldM").value;

    //let img2 = document.querySelector("#newImgItemM");
   

    console.log("form data " +formData);


    console.log("name : " + itemName + " quantity: "+ itemQuantity + " desc: " + itemDesc + " maxLoan: "+ itemMaxLoan);

    formData.append("itemName", itemName);
    formData.append("itemQuantity", itemQuantity);
    formData.append("itemDesc", itemDesc);
    formData.append("itemMaxLoan", itemMaxLoan);
    formData.append("itemId", idToModify);
   // formData = appendImageToFomData(formData, img2, "itemImg");
    
    

    go("/items/modifyItem", "POST", formData, {}).then(d => {
        console.log(d);

        if(d["quant"] > 0)
        alert("No se pudo modificar el material\nLa nueva cantidad elegida es menor que la cantidad alquilada actualmente.\nEl valor minimo que se puede poner es " + d["quant"])
        else{
            document.querySelector("#itemDesc"+idToModify).textContent = itemDesc
            document.querySelector("#itemName"+idToModify).textContent = itemName
            
            document.querySelector("#itemMaxLoan"+idToModify).value = itemMaxLoan
            document.querySelector("#itemMaxLoanText"+idToModify).textContent =  "Cantidad maxima que un usuario puede alquilar a la vez: "+ itemMaxLoan
            document.querySelector("#itemQuantity"+idToModify).value= itemQuantity;
            document.querySelector("#itemQuantityText"+idToModify).textContent = "Unidades: "+ itemQuantity;
            modalModifyItem.hide();

        }

    }).catch(() => console.log("fallo"));

}

document.getElementById("buttonFormConfirmItemImgM").addEventListener("click", modifyItemImg)

function modifyItemImg(){
    const myForm = document.getElementById("modifyItemFormImg");

   
     
     if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
     {
         myForm.reportValidity();
         return null;
     }

    let formData = new FormData();
    let img2 = document.querySelector("#newImgItemM");

    formData.append("itemId", itemImgToModify);
    formData = appendImageToFomData(formData, img2, "itemImg");

    go("/items/modifyItemImg", "POST", formData, {}).then(d => {
        //TODO cambiar imagen en la vista
        document.querySelector("#itemImg"+itemImgToModify).src = img2.src;
        modalModifyItemImg.hide();

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error al subir la imagen.\nPrueba subiendola en tamaños mas pequeños o en otros formatos")
    });

}



function deleteItem(e)
{
    if(!confirm("¿Seguro que quieres eliminar este material?"))
        return;

    let formData = new FormData();
    formData.append("itemId", e.target.value);

    go("/items/deleteItem", "POST", formData, {}).then(d => {
        if(d["isok"] == "todomal")
            alert("No se pudo eliminar el material.\nEl material esta en alquiler actualmente.\nNo se podra eliminar hasta que este sin alquilar")
        else
        {
          
            e.target.closest(".itemRow").remove();
        }
           

    }).catch(() => console.log("fallo"));

}


