"use strict"

var toastEl = document.getElementById('toastEndLoan')

// Crear una instancia del Toast de Bootstrap
var toastEndLoan = new bootstrap.Toast(toastEl)

/* document.getElementById("btnUndoEndLoan").addEventListener("click", undoEndLoan) */

let buttonsEndLoan = [];
buttonsEndLoan = document.querySelectorAll(".makeEndLoanBtn")
for(let i = 0; i < buttonsEndLoan.length; i++)
{
    buttonsEndLoan[i].addEventListener("click", endLoan)
}

/* let itemLoan; */

let deletedLoan;

function endLoan(e)
{
    let formData = new FormData();
    let twoIds = e.target.value.split(":");
    let itemId = parseInt(twoIds[0])
    let userId = parseInt(twoIds[1])
    formData.append("itemId", itemId)
    formData.append("userId", userId)


    go("/items/endLoan", "POST", formData, {}).then(d => {
        console.log(d);
        //document.querySelector("#"+e.target.value).remove();
        deletedLoan = document.getElementById(e.target.value);
        document.getElementById(e.target.value).remove();

        showToastEndLoan();

        document.getElementById("btnUndoEndLoan").value=twoIds;
       /*  itemLoan= d["itemLoan"]; */

        console.log("deleted "+ deletedLoan);

    }).catch(() => console.log("fallo"));
}

function showToastEndLoan()
{
    toastEndLoan.show();
}
/* 
function undoEndLoan()
{
    let formData = new FormData();
    formData.append("itemLoan", itemLoan);
    go("/items/undoEndLoan", "POST", formData, {}).then(d => {
        console.log(d);
        //document.querySelector("#"+e.target.value).remove();

    }).catch(() => console.log("fallo"));
    
} */

