
"use strict"

const modalAddLesson = new bootstrap.Modal(document.querySelector('#modalAddLesson'));
const modalModifyLesson = new bootstrap.Modal(document.querySelector('#modalModifyLesson'));
const modalModifyLessonImg = new bootstrap.Modal(document.querySelector('#modalModifyLessonImg'));
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

let sessionsToAddEs = []

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
    sessionsToAddEs.push(weekDayEs+"-"+hour.value);


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
    sessionsToAddEs.splice(index,1)
    
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
    let lessonDesc = document.getElementById("lessonDescField").value;
    let lessonPrice = document.getElementById("lessonPrice").value;
    let img = document.querySelector("#newImgLesson");
    console.log("capa: "+ lessonCapacity);

    formData.append("lessonName", lessonName);
    formData.append("lessonCapacity", lessonCapacity);
    formData.append("lessonPrice", lessonPrice);
    formData.append("period", sessionsToAddStr);
    formData.append("description", lessonDesc);

    formData = appendImageToFomData(formData, img, "lessonImg");
   

    go("/lessons/addNewLesson", "POST", formData, {}).then(d => {
        console.log(d);
        modalAddLesson.hide();
        myForm.reset();
        sessionListContainer.innerHTML = "";
        
       

        updateUiNewLesson(d["newId"], lessonName, lessonCapacity, lessonDesc, lessonPrice)
        setButtonsLessonsListeners()
        sessionsToAddEs = []
        sessionsToAdd = []

    }).catch(() => console.log("fallo"));

    
}





function updateUiNewLesson(lessonId, lessonName, lessonCapacity, lessonDesc, lessonPrice)
{
    let rootContainer = document.getElementById("lessonsContainer");

    let imgSrc = document.querySelector("#newImgLesson").src;


    let htmlNewLesson = '<div class="row lessonRow">'+

                            '<div class="col-3">'+
                            '<div class="lessonImgContainer">'+
                                
                                '<span>'+
                                '<img  src="'+imgSrc+'" id="lessonImg'+lessonId+'" class="lessonImg" />'+
                                '<!-- <button th:value="${item.id}" data-bs-toggle="modal" data-bs-target="#modalModifyItemImg" class="editImgButton">✏️</button> -->'+
                                '<button class="btn customButton material-symbols-rounded editImgButtonLesson" value="'+lessonId+'" data-bs-toggle="modal" data-bs-target="#modalModifyLessonImg">edit</button>'+
                                '</span>'+
                                
                            '</div>'+
                            
                            '</div>'+

                            '<div class="col">'+
    
    
                            '<div class="row lessonHeader">'+
                            '<div class="col-4">'+
                            '<p id="lessonName'+lessonId+'" class="" >'+lessonName+'</p>'+
                            '</div>'+
                            '<div class="col offset-3">'+
                            '<p id="lessonCapacityText'+lessonId+'" class="">Aforo: '+lessonCapacity+'</p>'+
                            '<input type="hidden" id="lessonCapacity'+lessonId+'" value="'+lessonCapacity+'">'+
                            '</div>'+
                            '<div class="col">'+
                            '<p id="lessonPriceText'+lessonId+'" class="lessonPrice">Precio: '+lessonPrice+'</p>'+
                            '<input type="hidden" id="lessonPrice'+lessonId+'" value="'+lessonPrice+'">'+
                            '</div>'+
                        '</div>'+
                        
                        '<div class="lessonDescContainer row">'+
                            '<p id="lessonDesc'+lessonId+'" class="lessonDescText">'+lessonDesc+'</p>'+
                            '</div>'+

                            '<div class="row sessionLessonContainer">';


    for(let i = 0; i < sessionsToAddEs.length; i++)
    {
        htmlNewLesson += '<span class="sessionLessonStr">'+sessionsToAddEs[i]+'</span>'+
                        '<input type="hidden" value="'+sessionsToAdd[i]+'">'
    }

                           /*  '<th:block th:each="sessionStr,iter: ${lesson.getListPeriodStrEs}">'+
                                '<span class="sessionLessonStr" th:text="${sessionStr}"></span>'+
                                '</th:block>'+ */
    htmlNewLesson +=     '</div>'+
                        '</div>'+

                        '<div class="col-1">'+
                            '<div class="lessonButtonsContainer">'+
                            '<button class="btn lessonButtonModify" value="'+lessonId+'" data-bs-toggle="modal" data-bs-target="#modalModifylesson">Modificar</button>'+
                            '<button value="'+lessonId+'" class="btn lessonButtonDelete deleteLesson">Eliminar</button>'+
                            '</div>'+
                        '</div>'+

                        '</div>'

    rootContainer.innerHTML += htmlNewLesson;
}


//cambia la previsualizacion de la imagen a subir de un nuevo item
document.querySelector("#fileFieldImgLesson").onchange = e => {
    console.log("imagen subida");
    let img = document.querySelector("#newImgLesson");
    let fileInput = document.querySelector("#fileFieldImgLesson");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};

//cambia la previsualizacion de la imagen a subir de un nuevo item
document.querySelector("#fileFieldImgLessonM").onchange = e => {
    console.log("ejecutado")
    console.log("imagen subida");
    let img = document.querySelector("#newImgLessonM");
    let fileInput = document.querySelector("#fileFieldImgLessonM");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};

let lessonImgToModify = -1;
setButtonsLessonsListeners();
function setButtonsLessonsListeners()
{

    let buttonsModifyLesson = [];
    buttonsModifyLesson = document.querySelectorAll(".lessonButtonModify")
    for(let i = 0; i < buttonsModifyLesson.length; i++)
    {
        buttonsModifyLesson[i].addEventListener("click", openModalModifyLesson)
    }
    
    let buttonsModifyImgLesson = []
    buttonsModifyImgLesson = document.querySelectorAll(".editImgButtonLesson");
    for(let i = 0; i < buttonsModifyImgLesson.length; i++)
    {
        buttonsModifyImgLesson[i].addEventListener("click", setIdLessonImgToModify)
    }


    let buttonsDeleteLesson = []
    buttonsDeleteLesson = document.querySelectorAll(".deleteLesson");
    for(let i = 0; i < buttonsDeleteLesson.length; i++)
    {
        buttonsDeleteLesson[i].addEventListener("click", deleteLesson)
    }

    function setIdLessonImgToModify(e)
    {
        lessonImgToModify = e.target.value;
    }

}
document.querySelector("#buttonFormConfirmLessonImgM").addEventListener("click", modifyLessonImg)

function modifyLessonImg(){
    const myForm = document.getElementById("modifyLessonFormImg");

   
     
     if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
     {
         myForm.reportValidity();
         return null;
     }

    let formData = new FormData();
    let img2 = document.querySelector("#newImgLessonM");

    formData.append("lessonId", lessonImgToModify);
    formData = appendImageToFomData(formData, img2, "lessonImg");

    go("/lessons/modifyLessonImg", "POST", formData, {}).then(d => {
        //TODO cambiar imagen en la vista
        document.querySelector("#lessonImg"+lessonImgToModify).src = img2.src;
        modalModifyLessonImg.hide();
        

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error al subir la imagen.\nPrueba subiendola en tamaños mas pequeños o en otros formatos")
    });

}


function deleteLesson(e)
{
    if(!confirm("¿Seguro que quieres eliminar esta clase?\nSe eliminaran también automáticamente todas las reservas de usuarios a esta clase."))
        return;

    let formData = new FormData();
    formData.append("lessonId", e.target.value);

    go("/lessons/deleteLesson", "POST", formData, {}).then(d => {
        if(d["isok"] == "todomal")
            alert("No se pudo eliminar el material.\nEl material esta en alquiler actualmente.\nNo se podra eliminar hasta que este sin alquilar")
        else
        {
            e.target.closest(".lessonRow").remove();
        }
           

    }).catch(() => console.log("fallo"));

}

let warningsM = document.querySelectorAll(".warningLessonsM")

let initialSessionsToModify = []
let initialSessionsToModifyEs = []

let sessionsToModify = []

let sessionsToModifyEs = []
let sessionsContainerM = document.querySelector("#sessionListContainerM")

let idLessonToModify = -1;
function openModalModifyLesson(e)
{
    idLessonToModify = e.target.value
   // createNewItemUI()
   console.log("aqui2")
    let id ="";
    id = e.target.value;
    idToModify = id;

    let lessonToModifyContainer =  e.target.closest(".lessonRow");

    document.querySelector("#sessionListContainerM").innerHTML = "";

    console.log("closest: " + lessonToModifyContainer)

    let desc = document.querySelector("#lessonDesc"+id).textContent
    let name = document.querySelector("#lessonName"+id).textContent
   // let imgSrc =  document.querySelector("#lessonImg"+id).src;
    let capacity = document.querySelector("#lessonCapacity"+id).value;
    let price = document.querySelector("#lessonPrice"+id).value;
    

    document.querySelector("#lessonNameFieldM").value = name;
    document.querySelector("#lessonDescFieldM").value = desc;
    //document.querySelector("#newImglessonM").src =imgSrc;
    document.querySelector("#lessonCapacityM").value = capacity;
    document.querySelector("#lessonPriceM").value = price;

    let sessionsContainer = document.querySelector("#lessonSessions"+id)
        
    let sessionListAux = sessionsContainer.querySelectorAll("input")
    let sessionListEsAux = sessionsContainer.querySelectorAll("span")

    console.log("leidas: " + sessionListAux)
    console.log("leidasEs: " + sessionListEsAux)

    initialSessionsToModify = []
    initialSessionsToModifyEs = []

    sessionsToModify = []
    sessionsToModifyEs =[]
    
    console.log("initial:" + initialSessionsToModify)
    for(let i = 0; i < sessionListAux.length; i++)
        initialSessionsToModify.push(sessionListAux[i].value)
    for(let i = 0; i < sessionListEsAux.length; i++)
        initialSessionsToModifyEs.push(sessionListEsAux[i].textContent)

    console.log(initialSessionsToModify)
    console.log(initialSessionsToModifyEs)

    sessionsContainerM.innerHTML = ""
    for(let i = 0; i < initialSessionsToModifyEs.length; i++)
    {
       sessionsToModify.push(initialSessionsToModify[i])
       sessionsToModifyEs.push(initialSessionsToModifyEs[i])

        let newSessionhtml = '<div class="col-sm-4 addSessionContainer">'+
        '<span class="sesionDate">'+initialSessionsToModifyEs[i]+'</span>'+
            '<button class="btn btnRemoveAddSessionM"  value="'+initialSessionsToModify[i]+'">❌</Button>'+
        '</div>'; 
        sessionsContainerM.innerHTML += newSessionhtml;
    }


    setBtnsRemoveAddSessionListenersM();

   
    for(let i = 0; i < warningsM.length ; i++)
        warningsM[i].style.display = "none"
    

}


document.querySelector(".btnAddSessionM").addEventListener("click", showAddSessionM)

let btnShowAddSessionM = document.querySelector(".btnAddSessionM")
btnShowAddSessionM.addEventListener("click", showAddSessionM)
let btnAddLessonM = document.querySelector("#buttonFormConfirmLessonM")
btnAddLessonM.addEventListener("click", modifyLesson)

let btnAddNewSessionM = document.querySelector(".addNewSessionM")
btnAddNewSessionM.addEventListener("click", addNewSessionM)

let btnCancelAddSessionM = document.querySelector(".cancelAddSessionM")
btnCancelAddSessionM.addEventListener("click", cancelAddSessionM)

function showAddSessionM()
{
    console.log("pulsado")
    document.querySelector(".newSessionRowM").style.display = "block"
    btnShowAddSessionM.disabled = true
    btnAddLessonM.disabled = true
  /*   btnShowAddSession.disabled = true;
    btnAddLesson.disabled = true; */
}

function cancelAddSessionM()
{
   hideAddSessionM();
}

function hideAddSessionM()
{
    document.querySelector(".newSessionRowM").style.display = "none"
    btnShowAddSessionM.disabled = false
    btnAddLessonM.disabled = false
}

function setBtnsRemoveAddSessionListenersM()
{
    let btnsRemoveAddSession = [];
    btnsRemoveAddSession = document.querySelectorAll(".btnRemoveAddSessionM")
    for(let i = 0; i < btnsRemoveAddSession.length; i++)
    {
        btnsRemoveAddSession[i].addEventListener("click", removeAddSessionM)
    }
}

function removeAddSessionM(e)
{
    console.log("e: "+e)
    console.log("etar "+ e.value)
 console.log("aqui")

    let initialIndex = initialSessionsToModify.indexOf(e.target.value+"")
    


    let index = sessionsToModify.indexOf(e.target.value+"");

    console.log("index es: " + index+ " e initial index es " +initialIndex)
    
    sessionsToModify.splice(index,1)
    sessionsToModifyEs.splice(index,1)

    console.log("sessions to modify: "+ sessionsToModify);
    console.log("sessions to modifyEs: "+ sessionsToModifyEs);
    e.target.closest(".addSessionContainer").remove();
    //console.log(sessionsToAdd); 
    setBtnsRemoveAddSessionListenersM()
    
    if(initialIndex >= 0)
    {
        for(let i = 0; i < warningsM.length ; i++)
        {
            warningsM[i].style.display = "block"
        }
    }
        
           
    
    
}


function addNewSessionM()
{
    //TODO cargar nuevo html y guardar los datos de la session nueva para 
    //tenerlos listos para el envio del formulario final
    console.log("añadiend nueva sesion to mod")


    let  weekDay = document.getElementById("sessionDayM");
    let weekDayEs = weekDay.options[weekDay.selectedIndex].text;

    let  hour = document.getElementById("addSessionTimeM");
    console.log("week: "+weekDay.value + " hour: " + hour.value + " text: " + weekDayEs)
    if(hour.value === "")
    {
        console.log("No value")
        alert("Debes especificar la hora a la que ocurre la clase")
        return;
    }

   
    sessionsToModify.push(weekDay.value+"-"+hour.value)
    sessionsToModifyEs.push(weekDayEs+"-"+hour.value);


    let newSessionhtml = '<div class="col-sm-4 addSessionContainer">'+
                            '<span class="sesionDate">'+weekDayEs+'-'+hour.value+'</span>'+
                            '<button class="btn btnRemoveAddSessionM"  value="'+weekDay.value+"-"+hour.value+'">❌</Button>'+
                        '</div>'; 


    sessionListContainerM.innerHTML += newSessionhtml;
    hideAddSessionM()
    setBtnsRemoveAddSessionListenersM()
    console.log("sessions to modify: "+ sessionsToModify);
    console.log("sessions to modifyEs: "+ sessionsToModifyEs);
}



function modifyLesson()
{
    const myForm = document.getElementById("modifyLessonForm");

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
        return null;
    }

    if(sessionsToModify.length == 0)
    {
        alert("La clase debe tener al menos una sesión en la que se realiza.\nAñade una nueva sesión indicando día de la semana y hora")
        return;
    }

    let sessionsToModifyStr = sessionsToModify[0];
    for(let i = 1;i < sessionsToModify.length; i++){
        sessionsToModifyStr+=","+sessionsToModify[i]
    }

    let formData = new FormData();

    let lessonName = document.getElementById("lessonNameFieldM").value;
    let lessonCapacity = document.getElementById("lessonCapacityM").value;
    let lessonDesc = document.getElementById("lessonDescFieldM").value;
    let lessonPrice = document.getElementById("lessonPriceM").value;
    console.log("period modify: "+ sessionsToModifyStr);

    formData.append("lessonName", lessonName);
    formData.append("lessonCapacity", lessonCapacity);
    formData.append("lessonPrice", lessonPrice);
    formData.append("period", sessionsToModifyStr);
    formData.append("description", lessonDesc);
    formData.append("lessonId", idLessonToModify);

    let deletedSessions =""

    for(let i = 0; i < initialSessionsToModify.length; i++)
    {
        let index = sessionsToModify.indexOf(initialSessionsToModify[i]);
        if(index <0)//el antiguo no esta en el nuevo
            deletedSessions += initialSessionsToModify[i] +","
    }


    let newSessions =""
    for(let i = 0; i < sessionsToModify.length; i++)
    {
        let index = initialSessionsToModify.indexOf(sessionsToModify[i]);
        if(index <0)//el nuevo no esta en el antigup (es nueva sesion)
            newSessions += sessionsToModify[i] +","
    }


    if(deletedSessions.length > 0)
         deletedSessions = deletedSessions.slice(0, -1)

    console.log("deleted: " + deletedSessions);
    console.log("new : " + sessionsToModifyStr);

    formData.append("deletedSessions", deletedSessions);
    formData.append("newSessions", newSessions);

 
   //TODO: mandar tal cual. Luego en java ver si las originales estan contenidas en esta lista de horas
   //y en todas las que no lo este borrar sessiones

     go("/lessons/modifyLesson", "POST", formData, {}).then(d => {
        console.log(d);

        modalModifyLesson.hide()

        let sessionListCardModified = document.querySelector("#lessonSessions"+idLessonToModify)

        sessionListCardModified.innerHTML = ""

        let auxSessionsHtml = ""

        console.log(sessionsToModifyEs)

        for(let i = 0; i < sessionsToModifyEs.length; i++)
        {
            auxSessionsHtml += '<span class="sessionLessonStr">'+sessionsToModifyEs[i]+'</span>'+   
                                '<input type="hidden" value="'+sessionsToModify[i]+'">'
        }

        sessionListCardModified.innerHTML = auxSessionsHtml;

        sessionsToModify = []
        sessionsToModifyEs = []


       /*  modalAddLesson.hide();

       
        myForm.reset();
        sessionListContainer.innerHTML = "";
        sessionsToAdd = []
       

        updateUiNewLesson(d["newId"], lessonName, lessonCapacity, lessonDesc, lessonPrice)
        setButtonsLessonsListeners()
        sessionsToAddEs = [] */

    })/* .catch(() => console.log("fallo"));  */

    
}