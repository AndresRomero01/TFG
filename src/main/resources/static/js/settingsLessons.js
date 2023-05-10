
"use strict"

const modalAddLesson = new bootstrap.Modal(document.querySelector('#modalAddLesson'));
console.log("settings lessons")


let btnShowAddSession = document.querySelector(".btnAddSession")
btnShowAddSession.addEventListener("click", showAddSession)

let btnAddLesson = document.querySelector("#buttonFormConfirmLesson")

let btnCancelAddSession = document.querySelector(".cancelAddSession")
btnCancelAddSession.addEventListener("click", cancelAddSession)

let btnAddNewSession = document.querySelector(".addNewSession")
btnAddNewSession.addEventListener("click", addNewSession)

//boton enviar formulario
document.getElementById("buttonFormConfirmLesson").addEventListener("click", newLesson)

function setBtnsRemoveAddSessionListeners()
{
    let btnsRemoveAddSession = [];
    btnsRemoveAddSession = document.querySelectorAll(".btnRemoveAddSession")
    for(let i = 0; i < btnsRemoveAddSession.length; i++)
    {
        btnsRemoveAddSession[i].addEventListener("click", removeAddSession)
    }
}


let sessionListContainer = document.querySelector("#sessionListContainer")

let sessionsToAdd = []

function showAddSession()
{
    console.log("pulsado")
    document.querySelector(".newSessionRow").style.display = "block"
    btnShowAddSession.disabled = true;
    btnAddLesson.disabled = true;
}

function cancelAddSession()
{
   hideAddSession();
}

function hideAddSession()
{
    document.querySelector(".newSessionRow").style.display = "none"
    btnShowAddSession.disabled = false;
    btnAddLesson.disabled = false;
}

function addNewSession()
{
    //TODO cargar nuevo html y guardar los datos de la session nueva para 
    //tenerlos listos para el envio del formulario final
    console.log("añadiend nueva sesion")


    let  weekDay = document.getElementById("sessionDay");
    let weekDayEs = weekDay.options[weekDay.selectedIndex].text;

    let  hour = document.getElementById("addSessionTime");
    console.log("week: "+weekDay.value + " hour: " + hour.value + " text: " + weekDayEs)
    if(hour.value === "")
    {
        console.log("No value")
        alert("Debes especificar la hora a la que ocurre la clase")
        return;
    }

   
    sessionsToAdd.push(weekDay.value+"-"+hour.value)


    let newSessionhtml = '<div class="col-sm-4 addSessionContainer">'+
                            '<span class="sesionDate">'+weekDayEs+'-'+hour.value+'</span>'+
                            '<button class="btn btnRemoveAddSession"  value="'+weekDay.value+"-"+hour.value+'">❌</Button>'+
                        '</div>'; 


    sessionListContainer.innerHTML += newSessionhtml;
    hideAddSession()
    setBtnsRemoveAddSessionListeners()
    console.log(sessionsToAdd);  
}


function removeAddSession(e)
{
    console.log("e: "+e)
    console.log("etar "+ e.value)
 console.log("aqui")
    let index = sessionsToAdd.indexOf(e.target.value+"");
    sessionsToAdd.splice(index,1)
    
    e.target.closest(".addSessionContainer").remove();
    console.log(sessionsToAdd); 
    setBtnsRemoveAddSessionListeners()
}


function newLesson()
{
    const myForm = document.getElementById("addLessonForm");

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
        return null;
    }

    if(sessionsToAdd.length == 0)
    {
        alert("La clase debe tener al menos una sesión en la que se realiza.\nAñade una nueva sesión indicando día de la semana y hora")
        return;
    }

    let sessionsToAddStr = sessionsToAdd[0];
    for(let i = 1;i < sessionsToAdd.length; i++){
        sessionsToAddStr+=","+sessionsToAdd[i]
    }

    let formData = new FormData();

    let lessonName = document.getElementById("lessonNameField").value;
    let lessonCapacity = document.getElementById("lessonCapacity").value;
    console.log("capa: "+ lessonCapacity);

    formData.append("lessonName", lessonName);
    formData.append("lessonCapacity", lessonCapacity);
    formData.append("period", sessionsToAddStr);

    go("/lessons/addNewLesson", "POST", formData, {}).then(d => {
        console.log(d);
        modalAddLesson.hide();
        myForm.reset();
        sessionListContainer.innerHTML = "";
        sessionsToAdd = []


    }).catch(() => console.log("fallo"));

       
}