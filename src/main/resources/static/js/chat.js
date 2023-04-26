
var toggleChat = false;
var selectedStaffId;
var lastSelectedChat;
let chatWindow = document.getElementById("chatWindow");
const alreadyLoadedChats = new Set();
const alreadyLoadedTrainers = new Set(); //sets used to ensure no duplicated chats or trainer because page hasnt been refreshed and they were added at the time

function manageChat(){
    console.log("in manage chat");
    toggleChat =  !toggleChat;
    

    if (toggleChat) {
        loadCurrentChats();
        showChat();
    } else {
        closeChat();
    }
}

document.addEventListener("DOMContentLoaded", ()=>{

    /* var targetDiv = document.getElementById("1Panel");
    targetDiv.scrollTop = targetDiv.scrollHeight;
    targetDiv.scrollTo(0, targetDiv.scrollHeight); */
})

function scrollBottomFirstChat(){
    /* let chatDivs = document.getElementsByClassName("showConversation");
    chatDivs[0].scrollTo(0, chatDivs[0].scrollHeight); */
}

function manageChatWindows(e){
    const panelId = e.target.id + "Panel";

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("innerChatWindow");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(panelId).style.display = "block";
    document.getElementById("goBackArrow").style.display = "inline-block";

}

function manageChats(e){
    const panelId = e.target.id + "ChatPanel";

    if(lastSelectedChat != null) lastSelectedChat.className = "selectChat";
    
    lastSelectedChat = document.getElementById(e.target.id);
    lastSelectedChat.className = "selectChat selectedChat";

    selectedStaffId = e.target.id;
    loadConversation(e.target.id, panelId);
    

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("showConversation");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";      
    }

    var div = document.getElementById(panelId);
    div.style.display = "block";
    div.scrollTo(0, div.scrollHeight);
    document.getElementById("goBackArrow").style.display = "inline-block";

}

function openFirstWindow(){
    const panelId = "chatChoicesPanel";
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("innerChatWindow");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(panelId).style.display = "block";

    document.getElementById("goBackArrow").style.display = "none";
}

function closeChat(){
    chatWindow.style.display = "none";
}

function showChat(){
    chatWindow.style.display = "block";
}

function sendQuestion(){
    const myForm = document.getElementById("makeGeneralQuestionForm");
    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
    }
    else{
        const subject = document.getElementById("subject");
        const questionArea = document.getElementById("questionArea");
        const userId = document.getElementById("userId");
    
        let params = {"subject" : subject.value,
                        "questionArea" : questionArea.value,
                        "userId" : userId.value
        }; 
    
        console.log("userId: " + userId.value);
        questionArea.value = "";
        subject.value = "";
    
        go(config.rootUrl + "/newQuestion", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
    
        })
        .catch(() => {console.log("Error en catch newQuestion");
    
        })
    }
    
}

function sendMessage(){
    console.log("in send message");

    var textArea = document.getElementById("writeMessage");
    var msg = textArea.value;
    var userId = document.getElementById("idUs").value;

    textArea.value = "";
    console.log("selected staff " + selectedStaffId);

    let params = {"msg" : msg,
                    "userId" : userId,
                    "staffId" : selectedStaffId,
                    "userSentIt": true
    }; 

    go(config.rootUrl + "/newMessage", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        var panelId = selectedStaffId+"ChatPanel";
        /* console.log("panel id: " +  panelId); */

        var div = document.createElement("div");
        var p = document.createElement("p");
        div.className = "d-flex justify-content-end";
        p.className = "userMsg";
        div.style = "margin-right: 0.5em;";
        p.innerText = msg;
        div.appendChild(p);

        
        var currentChatBody = document.getElementById(panelId);
        currentChatBody.appendChild(div);

        forceScrollbarBottom(currentChatBody);
    })
    .catch(() => {console.log("Error en catch newMessage");

    })
}

function loadTrainers(){
    go(config.rootUrl + "/getStaffList", 'GET')
    .then(d => {console.log("todo ok") // va ok si el username no existe
        var divToAppend = document.getElementById("divToAppendStaff");
        d.forEach(e => {
            //console.log(e);
            if(!alreadyLoadedTrainers.has(e["id"])){
                alreadyLoadedTrainers.add(e["id"])
                var html = `
                <div class="row staffRow">
                    <div class="col col-md-8 staffNameCol">
                        `+e["firstName"]+` `+e["lastName"]+`
                    </div>
                    <div class="col col-md-4">
                    <button class="btn btn-sm customButton" onclick="openConversation(event)" value="`+e["id"]+`">Abrir chat</button>
                    </div>
                </div>
                `;
    
                divToAppend.insertAdjacentHTML("beforebegin", html); 
            } else {

            }
                  
        });

    })
    .catch(() => {console.log("Error en catch get staff list");

    })
}

function loadCurrentChats(){
    var userId = document.getElementById("idUs");

    go(config.rootUrl + "/getUserChats", 'GET')
    .then(d => {console.log("todo ok") // va ok si el username no existe
        var toAppendOpenChat = document.getElementById("toAppendOpenChat");
        var toAppendChatPanel = document.getElementById("toAppendChatPanel");
        d.forEach((e,index) => {
            if(!alreadyLoadedChats.has(e["id"])){ //so chats entries and panels dont get duplicated everytime the chat is opened
                alreadyLoadedChats.add(e["id"])

                /* console.log(e); */
                var openChat = `
                <button class="selectChat" id="`+e["id"]+`" onclick="manageChats(event)">`+e["firstName"]+` `+e["lastName"]+`</button>
                `;
                toAppendOpenChat.insertAdjacentHTML("afterbegin", openChat);

                var chatPanel = ``;
                if(index == d.length-1) { //last inserted is the one in the top of the list, which chat is currently displaying
                    chatPanel = `
                    <div class="showConversation firstChat" id="`+e["id"]+`ChatPanel"></div>
                    `;
                    loadConversation(e["id"], e["id"]+"ChatPanel");
                    selectedStaffId = e["id"];
                } else {
                    chatPanel = `
                    <div class="showConversation" id="`+e["id"]+`ChatPanel"></div>
                    `;
                }
                
                toAppendChatPanel.insertAdjacentHTML("afterend", chatPanel);
            } else {
                console.log("chat already existed");
            }
            
        });

    })
    .catch(() => {console.log("Error en catch get staff list");

    })
}

function loadConversation(id, panelId){
    var userId = document.getElementById("idUs").value;
    var staffId = id;

    go(config.rootUrl + "/getConversation?userId="+userId+"&staffId="+staffId, 'GET')
    .then(d => {console.log("todo ok") // va ok si el username no existe
        var chatBody = document.getElementById(panelId);
        chatBody.innerHTML = "";
        d.forEach(m => {
            /* console.log(m); */
            var div = document.createElement("div");
            var p = document.createElement("p");
            
            if(!m["userSentIt"]) {
                div.className = "d-flex flex-row";
                p.className = "staffMsg";
                div.style = "margin-left: 0.5em;";
            }
            else {
                div.className = "d-flex justify-content-end";
                p.className = "userMsg";
                div.style = "margin-right: 0.5em;";
            };
            p.innerText = m["text"];
            div.appendChild(p);

            chatBody.appendChild(div);
        });
        forceScrollbarBottom(chatBody);

    })
    .catch(() => {console.log("Error en catch get conversation");

    })
}

function forceScrollbarBottom(div){
    div.scrollTo(0, div.scrollHeight);
}

function openConversation(e){
    var chosenTrainerId = e.target.value;
    var chatAlreadyExists = false;

    var parentRow = e.target.closest(".staffRow");
    console.log(parentRow);
    var chosenTrainerNames = parentRow.getElementsByClassName("staffNameCol")[0];
    console.log(chosenTrainerNames.innerText);

    go(config.rootUrl + "/getUserChats", 'GET') //so no chats are duplicated if selected trainer already had a chat with user
    .then(d => {console.log("todo ok")

        d.forEach((e,index) => {
            if(e["id"] == chosenTrainerId) {
                chatAlreadyExists = true;
            }
        });

        if(!alreadyLoadedChats.has(chosenTrainerId) && !chatAlreadyExists){
            console.log("alreadyLoaded: " + alreadyLoadedChats.has(chosenTrainerId) + "   chatAlareadyExists: " + chatAlreadyExists );
            alreadyLoadedChats.add(chosenTrainerId);
            var toAppendOpenChat = document.getElementById("toAppendOpenChat");
            var openChat = `
            <button class="selectChat" id="`+chosenTrainerId+`" onclick="manageChats(event)">`+chosenTrainerNames.innerText+`</button>
            `;
            toAppendOpenChat.insertAdjacentHTML("afterbegin", openChat);
            var toAppendChatPanel = document.getElementById("toAppendChatPanel");
            var chatPanel = ``;
            chatPanel = `
                <div class="showConversation" id="`+chosenTrainerId+`ChatPanel"></div>
            `;
            toAppendChatPanel.insertAdjacentHTML("afterend", chatPanel);
        } else {
            console.log("el staff ya esta en la lista");
        }
    
        document.getElementById("seeChats").click(); //load chats window
        document.getElementById(chosenTrainerId).click(); //load staff chat

    })
    .catch(() => {console.log("Error en catch get staff list");

    }) 
}

document.addEventListener("DOMContentLoaded", () => {

    if (ws.receive) {
        const oldFn = ws.receive; // guarda referencia a manejador anterior
        ws.receive = (m) => {//reescribe lo que hace la funcion receive
            oldFn(m); // llama al manejador anterior En principio esto lo unico que hace es mostar por consola el objeto recibido
            if(config.user) {//admin could also receive msgs but not working cause it would case some problems
                var staffId = m["staffId"];
                var panelId = staffId + "ChatPanel";
                var msg = m["msg"];
        
                console.log("mid: " + m["msgId"]);
                console.log("from: " + m["staffId"]);
                console.log("msg: " + m["msg"]);

                var chatBody = document.getElementById(panelId);
                var div = document.createElement("div");
                var p = document.createElement("p");
                
                div.className = "d-flex flex-row";
                p.className = "staffMsg";
                div.style = "margin-left: 0.5em;";

                p.innerText = msg;
                div.appendChild(p);

                chatBody.appendChild(div);

                forceScrollbarBottom(chatBody);
            }
        }
    }
    
});