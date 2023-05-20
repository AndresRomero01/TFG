window.addEventListener("DOMContentLoaded", (event) => {
    let sub = document.getElementById("sub");
    console.log("----- " + sub.value);
    if(sub.value == "ONLINE") {
        document.getElementById("onsiteRibbon").style.display = "none";
        document.getElementById("onlineRibbon").style.display = "block";
        
    } else if(sub.value == "ONSITE"){
        document.getElementById("onlineRibbon").style.display = "none";
        document.getElementById("onsiteRibbon").style.display = "block";
    }
});

function suscribe(event){
    console.log("-- inside suscribe --");
    let onlineSub = event.target.dataset.sub == "online";
    console.log("onlineSub: " + onlineSub);

    let params = {"onlineSub" : onlineSub};    

    go(config.rootUrl + "/suscribe", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe
        if(onlineSub){
            document.getElementById("onsiteRibbon").style.display = "none";
            document.getElementById("onlineRibbon").style.display = "block";
            
        } else {
            document.getElementById("onlineRibbon").style.display = "none";
            document.getElementById("onsiteRibbon").style.display = "block";
            
        }
    })
    .catch(() => {console.log("Error en catch suscribe");//si el username ya existia

    })
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
/* var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
    trigger: 'focus'
  }) */

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

function cancelSub(){
    go(config.rootUrl + "/cancelSub", 'POST')
    .then(d => {console.log("todo ok") // va ok si el username no existe
        document.getElementById("onsiteRibbon").style.display = "none";
        document.getElementById("onlineRibbon").style.display = "none";
        document.getElementById("cancelSubscriptionDiv").style.display = "none";
    })
    .catch(() => {console.log("Error en catch cancelSub");//si el username ya existia

    })
}