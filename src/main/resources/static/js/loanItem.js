"use strict"

//import { getSelectedDay } from "./calendar.js";

//para poder llamar a getSelectedDay se debe incluir este archivo javascript despues d ecalendar.js


//getSelectedDayStr();//la primera llamada devuelve el dia de hoy

//let days = document.querySelectorAll(".day:not(.other)");

if(document.querySelector("#calendar") != null)
{
    let days = getClickableDays();
    //console.log(days);
    
    for(let i = 0; i < days.length; i++)
    {
        days[i].addEventListener("click", checkAvailability);
    }
}



let quantityAvailable = -1;

function checkAvailability(){

    let formData = new FormData();

    let itemId = document.querySelector("#itemId").value;

    let day = getSelectedDayStr();
    //let day = getSelectedDay();
   // availableItemDay

   formData.append("itemId", itemId);
   formData.append("date", day);

   go("/items/availableItemDay", "POST", formData, {}).then(d => {
        console.log(d);

        let quantity = d["availableItems"];
        quantityAvailable = quantity;

        let inputNumber = document.querySelector("#addQuantityItem");

        inputNumber.setAttribute("max", quantity)
        if(inputNumber.value > quantity)
            inputNumber.value = 0;

        document.querySelector("#availableQuantity").innerHTML = "Cantidad disponible del item el dia seleccionado: " + quantity;

    }).catch(() => console.log("fallo"));
    
    console.log("day from loanitem.js " + day);
}

/* function onUpdateCalendar()
{
    console.log("calendar updated");
} */



/**MutationObserver in javascrip
 * https://stackoverflow.com/questions/15657686/jquery-event-detect-changes-to-the-html-text-of-a-div */

 if(document.querySelector("#calendar") != null)
 {
// Select the target node.
var target = document.querySelector('#calendar')

// Create an observer instance.
var observer = new MutationObserver(function(mutations) {
    //console.log("cambio detectado");  
   /*  let days = document.querySelectorAll(".day:not(.other)");
    for(let i = 0; i < days.length; i++)
    {
        days[i].addEventListener("click", checkAvailability);
    }  */
    let days = getClickableDays();
    console.log("mostrando dias clickables")
    for(let i = 0; i < days.length; i++)
    {
        //days[i].addEventListener("click", checkAvailability);
        console.log("dia "+ days[i].innerHTML);
        days[i].addEventListener("click", checkAvailability);
    } 


});

// Pass in the target node, as well as the observer options.
observer.observe(target, {
    attributes:    true,
    childList:     true,
    characterData: true
});

 }


if(document.querySelector("#buttonMakeLoan") != null)
    document.querySelector("#buttonMakeLoan").addEventListener("click", makeLoan);




function makeLoan()
{

    let formData = new FormData();

    let itemId = document.querySelector("#itemId").value;

    let itemQuantity = document.querySelector("#addQuantityItem").value;
    let maxQuant = document.querySelector("#addQuantityItem").max;

    if(quantityAvailable == -1)
    {
        alert("No se ha seleccionado ningun dia");
        return; 
    }
    if(quantityAvailable == 0)
    {
        alert("No hay material disponible para alquilar el dia seleccionado");
        return; 
    }
    if(maxQuant < itemQuantity)
    {
        alert("Cantidad para alquilar invalida\nEl maximo que se puede alquilar es " + maxQuant + " unidades");
        return;
    }
    if(itemQuantity <= 0)
    {
        alert("Cantidad para alquilar invalida\nEl minimo de unidades para alquilar es 1");
        return; 
    }
    
    

    let day = getSelectedDayStr();

    formData.append("itemId", itemId);
    formData.append("date", day);
    formData.append("quantity", itemQuantity)



    go("/items/makeLoan", "POST", formData, {}).then(d => {
        console.log(d);

        window.alert("Reserva de material realiza con exito")
        window.location.replace("/items/myItems");
        
    }).catch(() => console.log("fallo"));

}

if(document.querySelector("#buttonRenovateLoan") != null)
    document.querySelector("#buttonRenovateLoan").addEventListener("click", renovateLoan);

function renovateLoan()
{
    let formData = new FormData();
    let itemId = document.querySelector("#itemId").value;
    
    formData.append("itemId", itemId);
    console.log("boton pulsado")

    go("/items/renovateLoan", "POST", formData, {}).then(d => {
        console.log(d);

        window.alert("Ampliacion del alquiler del material realizado con exito")
        window.location.replace("/items/myItems");
        
    }).catch(() => console.log("fallo"));

}