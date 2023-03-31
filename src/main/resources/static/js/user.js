let saveChangesButton = document.getElementById("saveChangesButton");
saveChangesButton.addEventListener("click", applyChanges);

const modifyProfileModal = new bootstrap.Modal(document.querySelector('#modifyProfileModal'));

/* function saveProfile() {
    console.log("--- in saveProfile() ---");
    const myForm = document.getElementById("modifyProfileForm");

    let username = document.getElementById("username");
    username.setCustomValidity("");

    // esto mira que el username no sean solo espacios (para q no haya un username que parece vacio)
    if (/^\s+$/.test( String(username.value)))
    {
        //string contains only whitespace
        username.setCustomValidity("Username cant be blank spaces");
        console.log("username just blank spaces")
    }

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
    }
    else{

        let userId = document.getElementById("userId");
        let oldUsername = document.getElementById("oldUsername");
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let password1 = document.getElementById("password1");
        let password2 = document.getElementById("password2");
        let address = document.getElementById("address");
        let phone = document.getElementById("phone");
        let email = document.getElementById("email");

        let params = {"username" : username.value,
                    "oldUsername" : oldUsername.value,
                    "firstName" : firstName.value,
                    "lastName" : lastName.value,
                    "password1" : password1.value,
                    "password2" : password2.value,
                    "address" : address.value,
                    "phone" : phone.value,
                    "email" : email.value};

        console.log("---" + userId.value);  
        console.log("new username: " + username.value);          
        console.log("old username: " + oldUsername.value);          

        go(config.rootUrl + "/modifyUser", 'POST', params)
        .then(d => {console.log("all ok") // va ok si el username no existe
                    username.setCustomValidity("");

                    modifyProfileModal.hide();

                    document.getElementById("showUsername").innerHTML = username.value;
                    document.getElementById("showAddress").innerHTML = address.value;
                    document.getElementById("showEmail").innerHTML = email.value;
                    document.getElementById("showPhone").innerHTML = phone.value;
                    document.getElementById("showFirstName").innerHTML = firstName.value;
                    document.getElementById("showLastName").innerHTML = lastName.value;
        })
        .catch(() => {console.log("Error en catch anadir empleado");//si el username ya existia
                    username.setCustomValidity("El usuario ya existe, escoja otro, por favor");
                    username.reportValidity();
        })
    }
} */

function applyChanges(){
    console.log("-- dentro de apply changes --");
    const id = document.getElementById("userId").value;
    const oldUsername = document.getElementById("oldUsername").value;
    const myForm = document.getElementById("modifyProfileForm");
    let username = document.getElementById("username");

    username.setCustomValidity("");
    console.log("el id guardado es: " +  id);

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
    }
    else{
        let username = document.getElementById("username");
        let oldUsername = document.getElementById("oldUsername");
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let password1 = document.getElementById("password1");
        let password2 = document.getElementById("password2");
        let address = document.getElementById("address");
        let phone = document.getElementById("phone");
        let email = document.getElementById("email");

        let params = {"username" : username.value,
                    "oldUsername" : oldUsername.value,
                    "firstName" : firstName.value,
                    "lastName" : lastName.value,
                    "password1" : password1.value,
                    "password2" : password2.value,
                    "address" : address.value,
                    "phone" : phone.value,
                    "email" : email.value,
                    "id" : id
        }; 

        go(config.rootUrl + "/modifyUser", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
            document.getElementById("oldUsername").value = d["username"];
            username.setCustomValidity("");
            document.getElementById("password1").value="";
            document.getElementById("password2").value="";
            document.getElementById('closeProfileModal').click(); // cutre, pero lo de arriba no me ha funcionado
        })
        .catch(() => {console.log("Error en catch apply changes");//si el username ya existia
            username.setCustomValidity("El usuario ya existe, escoja otro, por favor");
            username.reportValidity();
        })
    }

    
}

/* function validatePassword(){
    var password = document.getElementById("contrasena1Empleado");
    var confirm_password = document.getElementById("contrasena2Empleado");

    console.log("--- en validate password ---");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords don't match");
    } else {
        confirm_password.setCustomValidity('');
    }
} */