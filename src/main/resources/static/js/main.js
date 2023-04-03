function manageTabs(e){
    const panelId = e.target.id + "Panel";

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("customTab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(panelId).style.display = "block";
}

function validatePassword(){
    var password = document.getElementById("password1");
    var confirm_password = document.getElementById("password2");

    console.log("--- en validate password ---");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords don't match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

//TO-DO: esto se puede parametrizar para no repetir codigo
function validatePassword2(){
    var password = document.getElementById("password1Mod");
    var confirm_password = document.getElementById("password2Mod");

    console.log("--- en validate password ---");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords don't match");
    } else {
        confirm_password.setCustomValidity('');
    }
}