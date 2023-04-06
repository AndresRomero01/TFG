var selectedUserId;

document.addEventListener("DOMContentLoaded", () => {
    //forceScrollbarBottom(document.getElementById("staffChatBody"));
    if (ws.receive) {
        const oldFn = ws.receive; // guarda referencia a manejador anterior
        ws.receive = (m) => {//reescribe lo que hace la funcion receive
            oldFn(m); // llama al manejador anterior En principio esto lo unico que hace es mostar por consola el objeto recibido
            if(m["questionId"]){
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
                            <input type="hidden" class="messageId" value="`+m["questionId"]+`">
                            <input type="hidden" class="userId" value="`+m["userId"]+`">
                            <button class="btn btn-success" onclick="acceptChat(event)">Aceptar</button>
                            <a class="btn btn-secondary" href="/user/`+m["userId"]+`">Ver perfil</a>
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

            } else if(m["msgId"]){
                console.log("receiving user msg");

                var staffChatBody = document.getElementById("staffChatBody");
                var div = document.createElement("div");
                var p = document.createElement("p");
                
                div.className = "d-flex flex-row"
                p.className = "clientMsg";
                div.style = "margin-left: 1em;"
                
                p.innerText = m["msg"];
                div.appendChild(p);

                staffChatBody.appendChild(div);
                forceScrollbarBottom(staffChatBody);
            }
            
        }
    }

});

function acceptChat(e){
    var accordionHeader = e.target.closest(".accordion-header");
    console.log(accordionHeader);

    var userAlreadyExists = false;
    var userId = accordionHeader.getElementsByClassName("userId")[0].value;
    var userRows = document.getElementsByClassName("questionDiv");
    for(let i = 0; i < userRows.length; i++){
        if(userRows[i].id == userId) userAlreadyExists = true;
    }

    var messageId = accordionHeader.getElementsByClassName("messageId")[0];
    var params = {"messageId" : messageId.value }; 
    //console.log(messageId);
    var staffId = document.getElementById("idUs").value;
    //console.log("staffId: " + staffId);

    go(config.rootUrl + "/linkQuestionStaff", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente

    })
    .catch(() => {console.log("Error en catch accept chat");//si el username ya existia

    })

    if(!userAlreadyExists){
        var firstName = accordionHeader.getElementsByClassName("firstName")[0];
        var lastName = accordionHeader.getElementsByClassName("lastName")[0];

        var html = `
        <div class="row questionDiv" id="`+userId+`">
            <div class="col questionNames">`+firstName.innerText+` `+lastName.innerText+`</div>
            <div class="col">
                <input type="hidden" id="firstName" tvalue="`+firstName.innerText+`">
                <input type="hidden" id="lastName" value="`+lastName.innerText+`">
                <button class="btn btn-primary openChatButton" onclick="getConversation(event)" value="`+userId+`" data-bs-toggle="modal" data-bs-target="#chatModal">Chat</button>
                <a class="btn btn-secondary"  href="/user/`+userId+`">Ver perfil</a>
            </div>
        </div>
        `;

        var divToAppend = document.getElementById("divToAppend");
        divToAppend.insertAdjacentHTML("beforebegin", html);

        var addedDiv = document.getElementById(userId);
        var addedOpenChatButton = addedDiv.getElementsByClassName("openChatButton")[0].addEventListener("click", getConversation)
    }
    
    accordionHeader.parentNode.remove(); // remove accordion-item
}

function showStaffChat(e){
    console.log("en show staff chat");
}

function getConversation(e){
    console.log("en get conversation");
    var lastName = e.target.previousElementSibling;
    var firstName = lastName.previousElementSibling;
    document.getElementById("firstNameUserModal").innerText = firstName.value;
    document.getElementById("lastNameUserModal").innerText = lastName.value;

    var userId = e.target.value;
    selectedUserId = userId;
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
            forceScrollbarBottom(staffChatBody);
        });

    })
    .catch(() => {console.log("Error en catch get conversation");//si el username ya existia

    })
}

function sendStaffMessage(e){
    var textArea = document.getElementById("staffTextArea");
    var msg = textArea.value;
    var staffId = document.getElementById("idUs").value;
    console.log("userId: " + selectedUserId + "  msg: " + msg + "  staffId: " + staffId);
    console.log(staffId);

    let params = {"msg" : msg,
                    "userId" : selectedUserId,
                    "staffId" : staffId,
                    "userSentIt": false
    }; 

    go(config.rootUrl + "/newMessage", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        var panelId = "staffChatBody";
        /* console.log("panel id: " +  panelId); */

        var div = document.createElement("div");
        var p = document.createElement("p");
        div.className = "d-flex justify-content-end";
        p.className = "employeeMsg";
        div.style = "margin-right: 0.5em;";
        p.innerText = msg;
        div.appendChild(p);

        var currentChatBody = document.getElementById(panelId);
        currentChatBody.appendChild(div);

        textArea.value = "";
        forceScrollbarBottom(currentChatBody);
    })
    .catch(() => {console.log("Error en catch newMessage");

    })

}

//case when using browser back arrow and "Mis Chats" is selected, the panel is wrong (the one displayed is "Preguntas Generales")
function updateSubnavbar(){
    var generalQuestionsOption = document.getElementById("generalQuestions");
    generalQuestionsOption.click();
}

