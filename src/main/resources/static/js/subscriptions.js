window.addEventListener("DOMContentLoaded", (event) => {
    let sub = document.getElementById("sub");
    console.log("----- " + sub.value);
    if(sub.value == "ONLINE") {
        document.getElementById("onsiteRibbon").style.display = "none";
        document.getElementById("onlineRibbon").style.display = "block";
        
    } else {
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