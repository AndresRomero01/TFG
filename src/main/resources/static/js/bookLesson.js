"use strict"

let listofDays = []

let lessonId = document.getElementById("lessonId").value;


let auxDatesToBook = []
let sessions

let idSessionSelected = null
let isDaySelected = false;
let capaSelected = 0

let buttonMakeBook = document.getElementById("buttonMakeBook")

let bookClickableDays = []

    let formDataIni = new FormData();
    formDataIni.append("lessonId", lessonId)

go("/lessons/getDaysOfLesson", "POST", formDataIni, {}).then(d => {
    console.log(d);
    sessions = d;
    for(let i= 0; i < d.length; i++)
    {
        let date = new Date(d[i]["date"]);
       
        auxDatesToBook.push(date);
    }
    console.log(auxDatesToBook)


}).catch(() => console.log("fallo"));



var target = document.querySelector('#calendar')

// Create an observer instance.
var observer = new MutationObserver(function(mutations) {
    onlyBookDays();
    
});

// Pass in the target node, as well as the observer options.
observer.observe(target, {
    attributes:    true,
    childList:     true,
    characterData: true
});

setTimeout(() => {  onlyBookDays(); console.log("ejecutado timeout") }, 900);




//getSelectedDayStr();
function onlyBookDays()
{
    bookClickableDays = []

    let days = document.querySelectorAll(".day");
console.log("onlyBookDays")
    for(let i = 0; i < days.length; i++)
    {

        if(!days[i].classList.contains('other'))
        {
            let monthYear = document.querySelector(".header h1").innerHTML.split(" ");
            let monthNumber =  ESMonthToNumberStr(monthYear[0]);
            let yearNumber = parseInt(monthYear[1])
            var dayNumber = +days[i].querySelectorAll('.day-number')[0].innerText || +days[i].querySelectorAll('.day-number')[0].textContent;

            let validDay = false;
            for(let j = 0; j < auxDatesToBook.length; j++)
            {
                if(monthNumber == auxDatesToBook[j].getMonth() + 1)
                    if(dayNumber == auxDatesToBook[j].getDate())
                        validDay = true;
            }

            if(!validDay)
            {
                days[i].classList.add("prev")

                //borra los listener de esos dias
                var aux = days[i]
                var auxClone = aux.cloneNode(true);
                aux.parentNode.replaceChild(auxClone, aux);
                //days[i].removeEventListener("click", null);
            }
            else{

                //al ir por dias el reccorido y no por la respuesta esto no aporta nada
                if(!days[i].classList.contains("bookable"))
                {
                    
                    bookClickableDays.push(days[i])
                    console.log("dia "+ dayNumber + "/"+ monthNumber +"/" + yearNumber + "no estaba")
                    days[i].classList.add("bookable")
                }
                else{
                    console.log("dia "+ dayNumber + "/"+ monthNumber +"/" + yearNumber + "ya estaba")
                   
                }
                
                
                
            }



        }
    }

    setClickableDaysListeners();

    console.log("clickable: "+bookClickableDays)

    isDaySelected = false
    capaSelected = 0
    buttonMakeBook.disabled = true;
}



function setClickableDaysListeners()
{
    for(let i = 0; i < bookClickableDays.length; i++)
    {
        /* bookClickableDays[i].addEventListener("click", function(){
            let index = i;
            dayClicked(index);
        }, false); */
        bookClickableDays[i].addEventListener("click", dayClicked)
    }
}

function dayClicked(e)
{
  //  let days = document.querySelectorAll(".day");
    //console.log("pulsado index " + index + " value " + JSON.stringify(sessions[index]));
    idSessionSelected = null
    isDaySelected = true
    let monthYear = document.querySelector(".header h1").innerHTML.split(" ");
    let monthNumber =  ESMonthToNumberStr(monthYear[0]);
    let yearNumber = parseInt(monthYear[1])
    var dayNumber =  e.target.innerHTML//e.target.querySelector(".day-number").innerHTML//+days[index].querySelectorAll('.day-number')[0].innerText || +days[index].querySelectorAll('.day-number')[0].textContent;
    //console.log("valor " + e.target.innerHTML)
    console.log("dia "+ dayNumber + "/"+ monthNumber +"/" + yearNumber + " pulsado")
    console.log("mes y anio actual: " +monthNumber + "/"+ yearNumber)
    let select = document.getElementById("sessionsOfDay")

    select.innerHTML = '<option value="null" selected>Selecciona una hora</option>'

    for(let i = 0; i < sessions.length; i++)
    {
        let date = new Date(sessions[i]["date"]);

        let dayStr = date.getDate() +""
        if(dayStr.length == 1)
            dayStr = "0"+dayStr;
        
        console.log(date.getDate() + "  -  " + dayNumber)
        if(dayStr+"" === dayNumber)
        {
            console.log("iguales day")

            let monthStr = (date.getMonth()+1) +""
            if(monthStr.length == 1)
                monthStr = "0"+monthStr;
            if(monthStr == monthNumber)
            {
                console.log("iguales mes")
                if(date.getFullYear()+"" == yearNumber)
                {
                    console.log("iguales todo")
                    let hourStr = date.getHours() +"";
                    if(hourStr.length == 1)
                        hourStr = "0"+ hourStr;
                    let minStr = date.getMinutes() +"";
                    if(minStr.length == 1)
                        minStr = "0"+ minStr;
                    /* <option value="null" selected>Selecciona una hora</option> */
                    select.innerHTML +='<option value="'+sessions[i]["idSession"]+'">'+hourStr+":"+minStr+'</option>'
    
                }
            }
           
        }
          
    }




    select.innerHTML+= '</select>';

    console.log("html: "+select.innerHTML)

    let divQuant = document.getElementById("availableQuantity")
            divQuant.querySelector("div").innerHTML = 'Plazas disponibles para la sesion seleccionada: ?'

}

//listener select
document.getElementById("sessionsOfDay").addEventListener("change", selectChanged);


function selectChanged(e)
{
    console.log("cambiado a id " + e.target.value)
    
    for(let i = 0; i < sessions.length; i++)
    {
       
        if(sessions[i]["idSession"]==e.target.value)
        {
            console.log("iguales")
            let divQuant = document.getElementById("availableQuantity")
            divQuant.querySelector("div").innerHTML = 'Plazas disponibles para la sesion seleccionada: '+sessions[i]["capa"]
            idSessionSelected = sessions[i]["idSession"]
            capaSelected = sessions[i]["capa"]
            
            if(capaSelected > 0)
                buttonMakeBook.disabled = false;
            else
                buttonMakeBook.disabled = true;
            break;
        }
    } 

}

buttonMakeBook.addEventListener("click", makeBook)

//TODO: poner listener a los clickable days
//con el listener cambiar cantidad libre del dia seleccionado y select de horas disponibles ese dia
//cuando se pincha en otro dia o se cambia de mes la cantidad se vuleve a poner en ?
//y el select en elije un horario

function makeBook()
{
    let formData = new FormData();

    formData.append("sessionId", idSessionSelected)

    if(!isDaySelected)
        alert("Selecciona el dia que quieras hacer la reserva")

    if(idSessionSelected == null)
        alert("Selecciona una hora a la que quieras reservar")

    if(capaSelected == 0)
        alert("No hay plazas disponibles para el dia y hora seleccionados")
    

    go("/lessons/bookLessonSession", "POST", formData, {}).then(d => {
        console.log(d);

        if(d["res"] == -7)
        {
            window.location.replace("/lessons/payBooking?sessionId="+idSessionSelected);
        }
        else{
            if(d["res"] == -1)
            {
                alert("Error.\nYa tenías una reserva realizada para esta clase en el día y hora seleccionados.")
                return;
            }
                
            window.location.replace("/lessons/myBookingLessons");

        }

      

    

    }).catch(() => console.log("fallo"));
}
