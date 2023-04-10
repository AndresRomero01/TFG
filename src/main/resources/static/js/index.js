
document.getElementById("prevCourse").addEventListener("click", previousCourse);
document.getElementById("nextCourse").addEventListener("click", nextCourse);

/* let actualChecked; */




var rad = document.querySelectorAll(".myRadio");
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        enableDisableDetails();
    });
}

function previousCourse(){
    const actualCheckedIndex = getChecked();
    if(actualCheckedIndex == 1) previousId = "position" + 5;
    else previousId = "position" + (actualCheckedIndex-1);
    
    //no hace falta pq solo puede haber un radioButton con el mismo name checked?
    /* actualCheckedId = "position" + actualCheckedIndex;
    document.getElementById(actualCheckedId).checked = false; */ 

    document.getElementById(previousId).checked = true;
    enableDisableDetails()
}

function nextCourse(){
    const actualCheckedIndex = getChecked();
    if(actualCheckedIndex == 5) previousId = "position" + 1;
    else previousId = "position" + (actualCheckedIndex+1);
    document.getElementById(previousId).checked = true;
    enableDisableDetails();
}

function getChecked(){
    let actualIndex; //no se puede interrumpir el forEach con un return o break
    document.querySelectorAll(`input[name="position"]`).forEach((element,index) => {
        if(element.checked) {
            actualIndex = index+1;
        }
    });
    return actualIndex;
}

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
   // setInterval(() => {nextCourse()}, 3000);
    /* while(1){
        setTimeout(() => {
            nextCourse();
        }, 1000);
    } */
    
  });



function enableDisableDetails()
{
    const actualCheckedIndex = getChecked() -1;
    console.log("actual "+ actualCheckedIndex);//arry index

    let details = document.querySelectorAll(".myDetails")

    for(let i =0; i < details.length; i++)
    {
        details[i].classList.remove("detailsEnabled")
    }

    details[actualCheckedIndex].classList.add("detailsEnabled");
}


let items = document.querySelectorAll(".item");
for(let i = 0; i < items.length; i++)
{
    //items[i].addEventListener("click", selectCarrouselItem(i));
    items[i].addEventListener("click", function(){
        console.log("item pulsado con index: " +i)

        let radios = document.querySelectorAll(".myRadio");

        const actualCheckedIndex = getChecked() -1;

        radios[i].checked = true;
        radios[actualCheckedIndex] = false;

        enableDisableDetails();
        
        

    });
}







