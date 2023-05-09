const modifiedCourseToast = new bootstrap.Toast(document.querySelector('#successToast'));

function modifyCourse(){
    console.log("--- inside modifyCourse ---");

    let form = document.getElementById("modifyCourseForm");
    let nameInput = document.getElementById("courseName")
    let courseName = nameInput.value
    if(courseName != null || courseName=="" || courseName.equals("")) {
        console.log("No es null: " + courseName);
    } else {
        console.log("Si es null: " + courseName);
    }

    let desc = document.getElementById("courseDescription").value
    let isFree = document.getElementById("isFreeSwitch").checked
    let catId = document.getElementById("catSelect").value
    let courseId = document.getElementById("courseId").value

    let img = document.getElementById("coursePicture")
    let hasImage = img.src != "http://localhost:8080/img/drawing.jpg"
    let oldSrc = document.getElementById("oldImg").src

    console.log("desc: " + desc);

    if(courseName === "" || /^\s+$/.test( String(courseName))) { // so name cannot be just blank spaces
        nameInput.setCustomValidity("El nombre no puede ser vacío")
        nameInput.reportValidity()
    } else {
        nameInput.setCustomValidity("")
    }

    if(!form.checkValidity()) { //comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        form.reportValidity();
    } else {
        let params = {"name": courseName,
                    "cat": catId,
                    "desc": desc,
                    "courseId": courseId,
                    "isFree": isFree}; 

        go(config.rootUrl + "/modifyCourse", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        if(hasImage && oldSrc != img.src){
            modifyCourseImg(courseId)
        }
        //console.log("navCourse: " + document.getElementById("navCourses").href);

        })
        .catch(() => {console.log("Error en catch modifyCourse");//si el username ya existia

        })
    }
}

function openFileInput(){
    console.log("--- in openFileInput ---");
    document.getElementById("courseImgInput").click();
}

function changeImgPreview() {
    console.log("imagen subida");
    let img = document.querySelector("#coursePicture");
    let fileInput = document.querySelector("#courseImgInput");
    console.log(img, fileInput);
    readImageFileData(fileInput.files[0], img);
};


function modifyCourseImg(courseId){
    console.log("--- inside modifyCourseImg ---  courseId: " + courseId);

    let formData = new FormData();
    let img2 = document.querySelector("#coursePicture");

    formData.append("courseId", courseId);
    formData = appendImageToFomData(formData, img2, "courseImg");

    console.log("--- form data ---");
    console.log(formData);

    go("/modifyCourseImg", "POST", formData, {}).then(d => {
        //TODO cambiar imagen en la vista
        //document.querySelector("#coursePicture").src = img2.src;
        /* modalModifyCourseImg.hide(); */
        /* document.getElementById("navCourses").click() */
        modifiedCourseToast.show()

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error al subir la imagen.\nPrueba subiendola en tamaños mas pequeños o en otros formatos")
    });

}