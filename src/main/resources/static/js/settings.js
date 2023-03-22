// mostrar el primer tab
/* window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("staffPanel").style.display = "block";
    
}); */

function manageTabs(e, msg){
    console.log("msg: " + msg);

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("customTab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(msg).style.display = "block";
}