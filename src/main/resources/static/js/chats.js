
document.addEventListener("DOMContentLoaded", () => {
    if (config.socketUrl) {
        let subs = ["/questionForStaff"];
        ws.initialize(config.socketUrl, subs);
        console.log("suscribiendose a /questionForStaff");

    } else {
        console.log("Not opening websocket: missing config", config)
    }



});


document.addEventListener("DOMContentLoaded", () => {

if (ws.receive) {
    const oldFn = ws.receive; // guarda referencia a manejador anterior
    ws.receive = (m) => {//reescribe lo que hace la funcion receive
        oldFn(m); // llama al manejador anterior En principio esto lo unico que hace es mostar por consola el objeto recibido

        console.log("qid: " + m["questionId"]);
        var html = `
        <div class="accordion" id="accordionGeneralQuestions">
            <div id="toAppendAccordionEntry"></div>
            <div class="accordion-item">
                <div class="row accordion-header text-center" >
                <div class="col namesCol"><span class="firstName">`+m["firstName"]+` </span><span class="lastName">`+m["lastName"]+`</span></div>
                <div class="col subjectCol"><p class="subject">`+m["subject"]+`</p></div>
                <div class="col">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#item`+m["questionId"]+`" 
                        aria-expanded="false" aria-controls="2">
                        Ver mensaje
                    </button>
                    <input type="hidden" id="messageId" value="`+m["questionId"]+`">
                    <input type="hidden" class="userId" value="`+m["userId"]+`">
                    <button class="btn btn-primary" onclick="acceptChat(event)">Aceptar</button>
                    <a class="btn btn-primary" href="/user/`+m["id"]+`">Ver perfil</a>
                </div>
            </div>
                <div id="item`+m["questionId"]+`" class="accordion-collapse collapse" data-bs-parent="#accordionGeneralQuestions">
                <div class="accordion-body">
                    <p>`+m["question"]+`</p>
                </div>
                </div>
            </div>
        </div>
        `;

        var divToAppend = document.getElementById("toAppendAccordionEntry");
        divToAppend.insertAdjacentHTML("beforebegin", html);
    }
}

});

function acceptChat(e){
    var accordionHeader = e.target.closest(".accordion-header");

    var userAlreadyExists = false;
    var userId = accordionHeader.getElementsByClassName("userId")[0].value;
    var userRows = document.getElementsByClassName("questionDiv");
    for(let i = 0; i < userRows.length; i++){
        if(userRows[i].id == userId) userAlreadyExists = true;
    }

    var messageId = document.getElementById("messageId")
    var params = {"messageId" : messageId.value }; 

    go(config.rootUrl + "/linkQuestionStaff", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente

    })
    .catch(() => {console.log("Error en catch newQuestion");//si el username ya existia

    })

    if(!userAlreadyExists){
        var firstName = accordionHeader.getElementsByClassName("firstName")[0];
        var lastName = accordionHeader.getElementsByClassName("lastName")[0];

        var html = `
        <div class="row questionDiv" id="`+userId+`">
            <div class="col">`+firstName.innerText+` `+lastName.innerText+`</div>
            <div class="col">
                <input type="hidden" id="firstName" tvalue="`+firstName.innerText+`">
                <input type="hidden" id="lastName" value="`+lastName.innerText+`">
                <button class="btn btn-primary" onclick="getConversation(event)" value="`+userId+`" data-bs-toggle="modal" data-bs-target="#chatModal">Chat</button>
                <button class="btn btn-primary">Ver perfil</button>
            </div>
        </div>
        `;

        var divToAppend = document.getElementById("divToAppend");
        divToAppend.insertAdjacentHTML("beforebegin", html);
    }
    

    accordionHeader.parentNode.remove(); // remove accordion-item
}

function showStaffChat(e){
    console.log("en show staff chat");
}

function getConversation(e){
    var lastName = e.target.previousElementSibling;
    var firstName = lastName.previousElementSibling;
    document.getElementById("firstNameUserModal").innerText = firstName.value;
    document.getElementById("lastNameUserModal").innerText = lastName.value;

    var userId = e.target.value;
    var staffId = document.getElementById("staffId").value;
    console.log("userid: " + userId);
    console.log("staffid: " + staffId);

    go(config.rootUrl + "/getConversation?userId="+userId+"&staffId="+staffId, 'GET')
    .then(d => {console.log("todo ok") // va ok si el username no existe
        var staffChatBody = document.getElementById("staffChatBody");
        staffChatBody.innerHTML = "";
        d.forEach(m => {
            var div = document.createElement("div");
            var p = document.createElement("p");
            
            if(m["userSentIt"]) {
                div.className = "d-flex flex-row"
                p.className = "clientMsg";
                div.style = "margin-left: 1em;"
            }
            else {
                div.className = "d-flex justify-content-end"
                p.className = "employeeMsg";
                div.style = "margin-right: 1em;"
            };
            p.innerText = m["text"];
            div.appendChild(p);

            staffChatBody.appendChild(div);
        });

    })
    .catch(() => {console.log("Error en catch modificar empleado");//si el username ya existia

    })
}