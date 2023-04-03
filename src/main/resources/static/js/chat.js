
let toggleChat = false;
let chatWindow = document.getElementById("chatWindow");

function manageChat(){
    console.log("in manage chat");
    toggleChat =  !toggleChat;
    

    if (toggleChat) {
        showChat();
    } else {
        closeChat();
    }
}

document.addEventListener("DOMContentLoaded", ()=>{

    var targetDiv = document.getElementById("1Panel");
    targetDiv.scrollTop = targetDiv.scrollHeight;
    targetDiv.scrollTo(0, targetDiv.scrollHeight);
})

function scrollBottomFirstChat(){
    let chatDivs = document.getElementsByClassName("showConversation");
    chatDivs[0].scrollTo(0, chatDivs[0].scrollHeight);
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
    const panelId = e.target.id + "Panel";

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
    const subject = document.getElementById("subject");
    const questionArea = document.getElementById("questionArea");
    const userId = document.getElementById("userId");

    let params = {"subject" : subject.value,
                    "questionArea" : questionArea.value,
                    "userId" : userId.value
    }; 

    console.log("userId: " + userId.value);

    go(config.rootUrl + "/newQuestion", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente

        })
        .catch(() => {console.log("Error en catch newQuestion");//si el username ya existia

        })
}

function sendMessage(){
    console.log("en send message");
}

