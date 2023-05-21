function deleteCourse(e){
    

    let courseId = e.target.value

    let params = {"courseId": courseId}; 

    go(config.rootUrl + "/deleteCourse", 'POST', params)
    .then(d => {console.log("todo ok") // va ok si el username no existe o si existe pero era el del user correspondiente
        Array.from(document.getElementsByClassName(""+courseId)).forEach(e => {
            e.remove()
        })
    })
    .catch(() => {console.log("Error en catch deleteCourse");//si el username ya existia

    })
}