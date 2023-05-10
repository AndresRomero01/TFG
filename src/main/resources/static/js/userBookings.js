"use strict"


let btnsCancelBookings = document.querySelectorAll(".btnCancelBooking")


for(let i= 0; i < btnsCancelBookings.length; i++)
{
  btnsCancelBookings[i].addEventListener("click", cancelBooking)
}

function cancelBooking(e)
{

  let formData = new FormData();

  formData.append("sessionId", e.target.value)

 
  go("/lessons/cancelBookSession", "POST", formData, {}).then(d => {
    console.log(d);

    e.target.closest(".col-5").remove()



}).catch(() => console.log("fallo"));

}