"use strict"




/**MutationObserver in javascrip
 * https://stackoverflow.com/questions/15657686/jquery-event-detect-changes-to-the-html-text-of-a-div */

// Select the target node.
var target = document.querySelector('#calendar')
console.log("target" + target)

// Create an observer instance.
var observer = new MutationObserver(function(mutations) {
    //console.log("cambio detectado");  
   /*  let days = document.querySelectorAll(".day:not(.other)");
    for(let i = 0; i < days.length; i++)
    {
        days[i].addEventListener("click", checkAvailability);
    }  */

    disableEnableDays();

});

// Pass in the target node, as well as the observer options.
observer.observe(target, {
    attributes:    true,
    childList:     true,
    characterData: true
});


function getClickableDays()
{
    let clickableDays = [];
    let days = document.querySelectorAll(".day");
    console.log("days" + days);
    console.log("current" + auxCurrentDate.getDate());


    let monthYear = document.querySelector(".header h1").innerHTML.split(" ");
    let monthNumber =  ESMonthToNumberStr(monthYear[0]);
    let yearNumber = parseInt(monthYear[1])

      //si msotrando un anio anterior, todo disabled
    if(yearNumber < auxCurrentDate.getFullYear())
        return clickableDays;
      

       //si mostrando un mes anterior del mismo anio, todo disabled
    if(yearNumber == auxCurrentDate.getFullYear() && monthNumber < auxCurrentDate.getMonth()+1)
        return clickableDays;


    //Si mismo mes y anio, solo quitar los dias anteriores al actual (y los de otros meses)
    if (yearNumber == auxCurrentDate.getFullYear() && monthNumber == auxCurrentDate.getMonth()+1){
        
        for(let i = 0; i < days.length; i++)
        {
            var dayNumber = +days[i].querySelectorAll('.day-number')[0].innerText || +days[i].querySelectorAll('.day-number')[0].textContent;
            if(dayNumber >= auxCurrentDate.getDate() && !days[i].classList.contains('other'))
                clickableDays.push(days[i])
        }
        return clickableDays;
    }
    else{//meses siguientes al actual
        for(let i = 0; i < days.length; i++)
        {
            var dayNumber = +days[i].querySelectorAll('.day-number')[0].innerText || +days[i].querySelectorAll('.day-number')[0].textContent;
            if(!days[i].classList.contains('other'))
                clickableDays.push(days[i])
        }
        return clickableDays;
    }

 
}