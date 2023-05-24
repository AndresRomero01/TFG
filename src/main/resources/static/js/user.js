
const modalModifyUserImg = new bootstrap.Modal(document.querySelector('#modalUserImg'));
const infoModifiedToast = new bootstrap.Toast(document.querySelector('#infoModifiedToast'));

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
            infoModifiedToast.show();
            //document.getElementById('closeProfileModal').click(); // cutre, pero lo de arriba no me ha funcionado
        })
        .catch(() => {console.log("Error en catch apply changes");//si el username ya existia
            username.setCustomValidity("El usuario ya existe, escoja otro, por favor");
            username.reportValidity();
        })
    }

    
}

function updateDescription(){
    let params = {"userDescription" : document.getElementById("userDescription").value}; 
    console.log(document.getElementById("userDescription").value);

    go(config.rootUrl + "/updateUserDescription", 'POST', params)
    .then(d => {console.log("all ok") 
        infoModifiedToast.show();
    })
    .catch(() => {console.log("Error in catch update description");

    })
}

//document.getElementById("buttonFormNewUserImg").addEventListener("click", modifyUserImg)

function changeImgPreview() {
    console.log("imagen subida");
    let img = document.querySelector("#newUserImg");
    let fileInput = document.querySelector("#fileFieldUserImg");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};

function modifyUserImg(){
    const myForm = document.getElementById("userFormImg");
    let userId = document.getElementById("userId").value;
    console.log("--- Inside change img for user: " + userId);
     
    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        myForm.reportValidity();
        return null;
    }

    let formData = new FormData();
    let img2 = document.querySelector("#newUserImg");

    formData.append("userId", userId);
    formData = appendImageToFomData(formData, img2, "userImg");

    go("/user/modifyUserImg", "POST", formData, {}).then(d => {
        //TODO cambiar imagen en la vista
        document.querySelector("#userPicture").src = img2.src;
        modalModifyUserImg.hide();

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error al subir la imagen.\nPrueba subiendola en tamaños mas pequeños o en otros formatos")
    });

}