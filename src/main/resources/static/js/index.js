document.getElementById("prevCourse").addEventListener("click", previousCourse);
document.getElementById("nextCourse").addEventListener("click", nextCourse);

/* let actualChecked; */

function previousCourse(){
    const actualCheckedIndex = getChecked();
    if(actualCheckedIndex == 1) previousId = "position" + 5;
    else previousId = "position" + (actualCheckedIndex-1);
    
    //no hace falta pq solo puede haber un radioButton con el mismo name checked?
    /* actualCheckedId = "position" + actualCheckedIndex;
    document.getElementById(actualCheckedId).checked = false; */ 

    document.getElementById(previousId).checked = true;
}

function nextCourse(){
    const actualCheckedIndex = getChecked();
    if(actualCheckedIndex == 5) previousId = "position" + 1;
    else previousId = "position" + (actualCheckedIndex+1);
    document.getElementById(previousId).checked = true;
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
    setInterval(() => {nextCourse()}, 3000);
    /* while(1){
        setTimeout(() => {
            nextCourse();
        }, 1000);
    } */
    
  });