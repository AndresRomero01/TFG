const courseAddedToast = new bootstrap.Toast(document.querySelector('#successToast'));

function createCourse(){
    console.log("----- in createCourse -----");

    let img = document.getElementById("coursePicture")
    /* console.log("src: " + img.src); */
    let hasImage = img.src != "http://localhost:8080/img/drawing.jpg"

    let form = document.getElementById("createCourseForm");
    let input = document.getElementById("courseName");
    let cat = document.getElementById("catSelect")
    let catId = cat.value

    if(input.value === "" || /^\s+$/.test( String(input.value))) { // so name cannot be just blank spaces
        input.setCustomValidity("El nombre no puede ser vacío")
        input.reportValidity()
    } else {
        input.setCustomValidity("")
    }

    if(catId == "0"){
        cat.setCustomValidity("Debes elegir una categoría")
        cat.reportValidity()
    } else {
        cat.setCustomValidity("")
    }

    if(!form.checkValidity()) { //comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
        //si alguna condicion no se cumplia, llamamos a la funcion que muestra automaticamente un mensaje donde estuviera el primer error
        form.reportValidity();
    }
    else{
        console.log("name: " + input.value);
        let checked = document.getElementById("isFreeSwitch").checked
        console.log("checked: " + checked);

        let desc = document.getElementById("courseDescription").value
        console.log("course description: " + desc);

        
        console.log("cat: " + catId);

        let params = {"name": input.value,
                        "cat": catId,
                        "desc": desc,
                        "hasImage": hasImage,
                        "isFree": checked}; 

        go(config.rootUrl + "/createCourse", 'POST', params)
        .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
            if(hasImage){
                modifyCourseImg(d["courseId"])
            }
            //console.log("navCourse: " + document.getElementById("navCourses").href);
            
        })
        .catch(() => {console.log("Error en catch createCourse");//si el username ya existia

        })
        input.setCustomValidity("")
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
    /* const myForm = document.getElementById("courseFormImg");
    console.log("--- Inside change img for course: " + courseId);
     
    if(!myForm.checkValidity())//comprueba si se cumplen las condiciones html (required, longitud maxima, formato, etc)
    {
        myForm.reportValidity();
        return null;
    } */

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
        courseAddedToast.show()

    }).catch(
        (e) =>{ //console.log("fallo: "+ Object.values(e))
        alert("Error al subir la imagen.\nPrueba subiendola en tamaños mas pequeños o en otros formatos")
    });

}

