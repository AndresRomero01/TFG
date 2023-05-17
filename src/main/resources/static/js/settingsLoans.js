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

document.querySelector("#btnUndoEndLoan").addEventListener("click", undoEndLoan)

/* let itemLoan; */

let deletedLoan;

let lastDeletedLoanId;

let lastDeletedLoanComposedId;

let lastLoansContainer;

function endLoan(e)
{
    document.querySelector("#btnUndoEndLoan").style.display = "block";
    document.querySelector("#infoUndoRemoveLoan").style.display = "none";

    let formData = new FormData();
    let ids = e.target.value.split(":");
    lastDeletedLoanComposedId = e.target.value;
    let itemId = parseInt(ids[0])
    let userId = parseInt(ids[1])
    let loanId = parseInt(ids[2])
    lastDeletedLoanId = loanId;
    formData.append("itemId", itemId)
    formData.append("userId", userId)
    formData.append("loanId", loanId)


    go("/items/endLoan", "POST", formData, {}).then(d => {
        console.log(d);
        //document.querySelector("#"+e.target.value).remove();
        deletedLoan = document.getElementById(e.target.value);
        lastLoansContainer = deletedLoan.closest(".loansOfItemContainer")
        lastDeletedLoanId = e.target.value;
        document.getElementById(e.target.value).remove();

        toastEl.querySelector("#btnUndoEndLoan").value = e.target.value;

        showToastEndLoan();

      //  document.getElementById("btnUndoEndLoan").value=twoIds;
       /*  itemLoan= d["itemLoan"]; */

        console.log("deleted "+ deletedLoan);

    }).catch(() => console.log("fallo"));
}

function showToastEndLoan()
{
    toastEndLoan.show();
}


function undoEndLoan(e){
    console.log("deshaciendo remove")
    
    let formData = new FormData();
    let ids = lastDeletedLoanComposedId.split(":")
    console.log("id compo: " + ids)
    let itemId = parseInt(ids[0])
    let userId = parseInt(ids[1])
    let loanId = parseInt(ids[2])
    formData.append("itemId", itemId)
    formData.append("userId", userId)
    formData.append("loanId", loanId)

    console.log(formData)


    go("/items/undoEndLoan", "POST", formData, {}).then(d => {
       // lastLoansContainer.innerHTML += deletedLoan.outerHTML;
       lastLoansContainer.append(deletedLoan)
        document.querySelector("#btnUndoEndLoan").style.display = "none";
        document.querySelector("#infoUndoRemoveLoan").style.display = "block";
      /*   console.log(d);
        //document.querySelector("#"+e.target.value).remove();
        deletedLoan = document.getElementById(e.target.value);
        lastDeletedLoanId = e.target.value;
        document.getElementById(e.target.value).remove();

        toastEl.querySelector("#btnUndoEndLoan").value = e.target.value;

        showToastEndLoan();

        document.getElementById("btnUndoEndLoan").value=twoIds;
       

        console.log("deleted "+ deletedLoan); */

    }).catch(() => console.log("fallo"));


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

