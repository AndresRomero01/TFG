var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
/* var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'focus'
  }) */

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})



let buttonsCancelLoan = []

buttonsCancelLoan = document.querySelectorAll(".btnCancelLoan")

for(let i = 0; i < buttonsCancelLoan.length; i++)
{
  buttonsCancelLoan[i].addEventListener("click", cancelLoan);
}



function cancelLoan(e)
{
  console.log("loan a borrar id: "+e.target.value)

  let formData = new FormData();

 formData.append("loanId", e.target.value);


 go("/items/cancelLoan", "POST", formData, {}).then(d => {
      console.log(d);


      e.target.closest(".myColW").remove();

     
     // document.querySelector("#availableQuantity").innerHTML = "Cantidad disponible del item el dia seleccionado: " + quantity;

  }).catch(() => console.log("fallo"));
}


