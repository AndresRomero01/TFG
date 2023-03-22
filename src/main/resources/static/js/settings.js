// mostrar el primer tab
/* window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("staffPanel").style.display = "block";
    
}); */

/* window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js'); */
const addStaffModal = document.querySelector('#addStaffModal');

const addStaffButton = document.getElementById("addStaffButton");
addStaffButton.addEventListener("click", newStaff);

document.addEventListener("DOMContentLoaded", ()=>{

    document.querySelectorAll(".staffDiv").forEach(d => {
        const id = d.dataset.id; 
        var div = d;
        //********************BOTON ELIMINAR************************
        ajaxDeleteUser(div, id);
    })
})

function ajaxDeleteUser(div, id){

    div.querySelector(".deleteStaffButton").addEventListener("click", function(){
        console.log("eliminando elemento id ", id);
        go(config.rootUrl + "/user/deleteUser", 'POST', {"idUser" : id})
        .then(d => {console.log("todo ok en ajax borrar usuario") // va ok si el username no existe
                    div.remove();
        })
        .catch(() => {console.log("Error en ajax borrar usuario");//si el username ya existia
        }) 
    });
}

function manageTabs(e, msg){
    console.log("msg: " + msg);

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("customTab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(msg).style.display = "block";
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

function newStaff() {
    console.log("--- en validate user ---");
    const myForm = document.getElementById("addStaffForm");

    let username = document.getElementById("username");
    username.setCustomValidity("");

    // esto mira que el username no sean solo espacios (para q no haya un username que parece vacio)
    if (/^\s+$/.test( String(username.value)))
    {
        //string contains only whitespace
        username.setCustomValidity("El nombre no puede ser solo espacios");
        console.log("solo espacios")
    }

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
    }
    else{

        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let password1 = document.getElementById("password1");
        let password2 = document.getElementById("password2");
        let address = document.getElementById("address");
        let phone = document.getElementById("phone");
        let email = document.getElementById("email");

        let params = {"username" : username.value,
                    "firstName" : firstName.value,
                    "lastName" : lastName.value,
                    "password1" : password1.value,
                    "password2" : password2.value,
                    "address" : address.value,
                    "phone" : phone.value,
                    "email" : email.value
        };        

        go(config.rootUrl + "/user/addStaff", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe
                    username.setCustomValidity("");
                    console.log("------ " + d["idUser"]);
                    var staffDivList = document.getElementById("staffDivList");
                    var html0 = "asdasdasd123123";
                    var html = `
                    <div class="row staffDiv"  th:data-id="`+d["idUsuario"]+`" id="`+d["idUser"]+`">
                        <div class="col d-flex justify-content-start">
                            <p class="staffName">`+ firstName.value +` `+ lastName.value +`</p>
                        </div>
                        
                        <div class="col d-flex justify-content-end">
                            <button class="btn btn-secondary modifyStaffButton button_slide slide_left">Modificar</button>
                            <button class="btn btn-danger deleteStaffButton slide">Eliminar</button>
                        </div>
                    </div>
                    `;

                    staffDivList.insertAdjacentHTML("beforebegin",html);

                    myForm.reset();
                    /* addStaffModal.hide(); */
                    /* $('#addStaffModal').modal('hide') */
                    document.getElementById('closeModal').click(); // cutre, pero lo de arriba no me ha funcionado


                    let idDiv = "#"+d["idUser"];
                    console.log(idDiv + "----");

                    let div = document.getElementById(d["idUser"]);
                    ajaxDeleteUser(div, d["idUser"]);
        })
        .catch(() => {console.log("Error en catch anadir empleado");//si el username ya existia
                    username.setCustomValidity("El usuario ya existe, escoja otro, por favor");
                    username.reportValidity();
        })
    }
}