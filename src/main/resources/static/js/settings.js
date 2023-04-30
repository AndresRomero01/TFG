// mostrar el primer tab
/* window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("staffPanel").style.display = "block";
    
}); */

/* window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js'); */
const addStaffModal = document.querySelector('#addStaffModal');
const addStaffButton = document.getElementById("addStaffButton");
addStaffButton.addEventListener("click", newStaff);

const modifyStaffModal = document.querySelector('#modifyStaffModal');
document.querySelectorAll('.modifyStaffButton').forEach((btn) =>{
    btn.addEventListener("click", modifyStaff);
});
const modifyStaffButton = document.getElementById("modifyStaffButton");
modifyStaffButton.addEventListener("click", applyChanges);

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
                    <div class="row staffDiv"  data-id="`+d["idUser"]+`" id="`+d["idUser"]+`">
                        <div class="col d-flex justify-content-start">
                            <p class="staffName" id="`+d["idUser"]+`Names">`+ firstName.value +` `+ lastName.value +`</p>
                        </div>
                        
                        <div class="col d-flex justify-content-end">
                        <button class="btn btn-secondary modifyStaffButton button_slide slide_left" value="`+d["idUser"]+`" data-bs-toggle="modal" data-bs-target="#modifyStaffModal">Modificar</button>
                            <button class="btn btn-danger deleteStaffButton slide">Eliminar</button>
                        </div>
                    </div>
                    `;

                    staffDivList.insertAdjacentHTML("beforebegin",html);

                    myForm.reset();
                    /* addStaffModal.hide(); */
                    /* $('#addStaffModal').modal('hide') */
                    document.getElementById('closeModalAddStaff').click(); // cutre, pero lo de arriba no me ha funcionado


                    let idDiv = "#"+d["idUser"];
                    console.log(idDiv + "----");

                    let div = document.getElementById(d["idUser"]);
                    ajaxDeleteUser(div, d["idUser"]);

                    div.querySelector(".modifyStaffButton").addEventListener("click", function(e){
                        console.log("dentro de anadir modfy listener");
                        modifyStaff(e);
                    })
        })
        .catch(() => {console.log("Error en catch anadir empleado");//si el username ya existia
                    username.setCustomValidity("El usuario ya existe, escoja otro, por favor");
                    username.reportValidity();
        })
    }
}

function modifyStaff(e){
    const id = e.target.value;
    console.log("dentro de modify staff");
    console.log("el id es: " + id);

    document.getElementById("idUser").value = id;


    //hacer con post por si acaso, para que no se vea la contraseña de vuelta en la peticion?
    go(config.rootUrl + "/getUser?id="+id, 'GET')
    .then(d => {console.log("todo ok") // va ok si el username no existe
        document.getElementById("usernameMod").value = d["username"];
        document.getElementById("oldUsername").value = d["username"];
        document.getElementById("firstNameMod").value = d["firstName"];
        document.getElementById("lastNameMod").value = d["lastName"];
        /* document.getElementById("password1Mod").value = d["password"];
        document.getElementById("password2Mod").value = d["password"]; */
        document.getElementById("addressMod").value = d["address"];
        document.getElementById("phoneMod").value = d["phone"];
        document.getElementById("emailMod").value = d["email"];


    })
    .catch(() => {console.log("Error en catch modificar empleado");//si el username ya existia

    })
    
}

function applyChanges(){
    console.log("-- dentro de apply changes --");
    const id = document.getElementById("idUser").value;
    const oldUsername = document.getElementById("oldUsername").value;
    const myForm = document.getElementById("modifyStaffForm");
    let username = document.getElementById("usernameMod");

    username.setCustomValidity("");
    console.log("el id guardado es: " +  id);

    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        myForm.reportValidity();
    }
    else{
        let username = document.getElementById("usernameMod");
        let oldUsername = document.getElementById("oldUsername");
        let firstName = document.getElementById("firstNameMod");
        let lastName = document.getElementById("lastNameMod");
        let password1 = document.getElementById("password1Mod");
        let password2 = document.getElementById("password2Mod");
        let address = document.getElementById("addressMod");
        let phone = document.getElementById("phoneMod");
        let email = document.getElementById("emailMod");

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
            // para encontrar el firstNameMod a cambiar
            document.getElementById(id+"Names").innerHTML = firstName.value + " " + lastName.value;
/*             document.getElementById("lastNameMod").innerHTML = lastName; */
            document.getElementById('closeModalModifyStaff').click(); // cutre, pero lo de arriba no me ha funcionado
        })
        .catch(() => {console.log("Error en catch apply changes");//si el username ya existia
            username.setCustomValidity("El usuario ya existe, escoja otro, por favor");
            username.reportValidity();
        })
    }

    
}


/* ---- SUBSCRIPTIONS ----- */

function deletePhraseOnline(e){
    let index = e.target.value
    console.log("--- phrase index: " + index);

    let params = {"type": "online",
                    "index" : index
    }; 

    go(config.rootUrl + "/deletePhrase", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        e.target.closest(".phraseDiv").remove();
        let i = 0;
        document.querySelectorAll(".delOnline").forEach(e => {
            e.value = i;
            i++;
            console.log("value: " + e.value);
        })
    })
    .catch(() => {console.log("Error en catch deletePhrasesOnline");//si el username ya existia

    })
}

function deletePhraseOnsite(e){
    let index = e.target.value
    console.log("--- phrase index: " + index);

    let params = {"type": "onsite",
                    "index" : index
    }; 

    go(config.rootUrl + "/deletePhrase", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        e.target.closest(".phraseDiv").remove();
        let i = 0;
        document.querySelectorAll(".delOnsite").forEach(e => {
            e.value = i;
            i++;
            console.log("value: " + e.value);
        })
    })
    .catch(() => {console.log("Error en catch deletePhrasesOnsite");//si el username ya existia

    })
}

function addOnlinePhrase(){
    let phrase = document.getElementById("newOnlinePhrase").value;
    console.log("phrase: " + phrase);

    if(phrase != ""){
        let params = {"phrase": phrase,
        "type": "online"}; 

        go(config.rootUrl + "/addPhrase", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        let index = d["arraySize"]-1;
        console.log("new index: " + index);
        let html = `
            <div class="row phraseDiv">
                <div class="col col-md-9 phraseCol">
                    <p class="phrase">`+ phrase +`</p>
                </div>
                <div class="col col-md-2 deleteCol">
                    <button class="btn btn-danger material-symbols-rounded delPhraseButton delOnline" value="`+index+`" onclick="deletePhraseOnline(event)">delete</button>
                </div>
            </div>
        `;
        document.getElementById("divToAppendOnlinePhrases").insertAdjacentHTML("beforebegin",html)
        })
        .catch(() => {console.log("Error en catch en addOnlinePhrase");//si el username ya existia

        })
    }

}

function addOnsitePhrase(){
    let phrase = document.getElementById("newOnsitePhrase").value;
    console.log("phrase: " + phrase);

    if(phrase != ""){
        let params = {"phrase": phrase,
        "type": "onsite"}; 

        go(config.rootUrl + "/addPhrase", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        let index = d["arraySize"]-1;
        console.log("new index: " + index);
        let html = `
            <div class="row phraseDiv">
                <div class="col col-md-9 phraseCol">
                    <p class="phrase">`+ phrase +`</p>
                </div>
                <div class="col col-md-2 deleteCol">
                    <button class="btn btn-danger material-symbols-rounded delPhraseButton delOnsite" value="`+index+`" onclick="deletePhraseOnsite(event)">delete</button>
                </div>
            </div>
        `;
        document.getElementById("divToAppendOnsitePhrases").insertAdjacentHTML("beforebegin",html)
        })
        .catch(() => {console.log("Error en catch addOnsitePhrase");//si el username ya existia

        })
    }

}

function checkPriceValidity(){
    console.log("--- Checking price validity ---");
}

function changeOnlinePrice(){
    let form = document.getElementById("onlinePriceForm");
    let input = document.getElementById("onlinePrice");

    if(input.value < 0) {
        input.setCustomValidity("El precio no puede ser negativo")
        input.reportValidity()
    } else {
        input.setCustomValidity("")
    }

    if(!form.checkValidity()) { //comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        form.reportValidity();
    }
    else{
        let params = {"price": input.value,
        "type": "online"}; 

        go(config.rootUrl + "/changeGymSubPrice", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
            document.getElementById("onlinePriceLabel").innerHTML = "Precio online: " + input.value + "€"
        })
        .catch(() => {console.log("Error en catch changeGymSubPrice");//si el username ya existia

        })
    }
}

function changeOnsitePrice(){
    let form = document.getElementById("onsitePriceForm");
    let input = document.getElementById("onsitePrice");

    if(input.value < 0) {
        input.setCustomValidity("El precio no puede ser negativo")
        input.reportValidity()
    } else {
        input.setCustomValidity("")
    }

    if(!form.checkValidity()) { //comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        form.reportValidity();
    }
    else{
        let params = {"price": input.value,
        "type": "onsite"}; 

        go(config.rootUrl + "/changeGymSubPrice", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
            document.getElementById("onsitePriceLabel").innerHTML = "Precio presencial: " + input.value + "€"
        })
        .catch(() => {console.log("Error en catch changeGymSubPrice");//si el username ya existia

        })
    }
}