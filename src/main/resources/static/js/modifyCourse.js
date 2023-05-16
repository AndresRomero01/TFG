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
    let oldSrc = document.getElementById("oldImg").value

    let videoInput = document.getElementById("videoInput")
    let hasVideo = document.getElementById("hasVideoSwitch").checked
    let existsVideoInput = false
    if(videoInput.files[0]) existsVideoInput = true

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
                    "hasImage": hasImage,
                    "hasVideo": hasVideo,
                    "isFree": isFree}; 

        go(config.rootUrl + "/modifyCourse", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
            let imageHasChanged = oldSrc != img.src
            console.log("oldSrc: " + oldSrc);
            console.log("new src: " + img.src);
            console.log("hasImage: " + hasImage + " imagenCambiada: " + imageHasChanged);
            if(hasImage && imageHasChanged){
                modifyCourseImg(courseId)
            }
            if(hasVideo && existsVideoInput){
                uploadVideo(courseId)
            }
            //console.log("navCourse: " + document.getElementById("navCourses").href);
            modifiedCourseToast.show()

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
        let oldSrc = document.getElementById("oldImg")
        oldSrc.value = img2.src

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error al subir la imagen.\nPrueba subiendola en tamaños mas pequeños o en otros formatos")
    });

}

function videoPreview(){
    let videoInput = document.getElementById("videoInput")
    console.log("src: " + videoInput.src);
    console.log("value: " + videoInput.value);
    console.log("file: " + videoInput.files[0]);

    let video = document.getElementById("videoPreview")
    
    let file = videoInput.files[0];
    if (file) {
        let url = URL.createObjectURL(file);
        video.src = url;
    }
}

function uploadVideo(courseId){
    console.log("--- inside uploadVideo ---");
    let video = document.getElementById("videoInput");
    /* console.log("video : " + video.files[0]); */

    let formData = new FormData();
    formData.append("courseId", courseId)
    formData.append("courseVideo", video.files[0])

    go("/uploadCourseVideo", "POST", formData, {}).then(d => {

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error en uploadCourseVideo. Tiene que ser menor que 100MB y estar en formato .mp4")
    });
}

function manageShowVideoRow(e){
    console.log("--- inside manageShowVideo ---");
    if(e.target.checked){
        /* document.getElementById("videoRow").style.display = "none !important" */
        document.getElementById("videoRow").style.setProperty("display", "block", "important");
    } else {
        /* document.getElementById("videoRow").style.display = "block !important" */
        document.getElementById("videoRow").style.setProperty("display", "none", "important");
    }
}