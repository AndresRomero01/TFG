function prueba(e){
    console.log("prueba " + e.target.id);
}

function updateCategoryTitle(e){
    const catTitle = document.getElementById("categoryTitle");
    catTitle.innerText = e.target.innerText;
}

function seeCourse(e){
  let courseId = e.target.value
  console.log("courseId to see: " + courseId);

  go(config.rootUrl + "/seeCourse?chosenCourseId="+courseId, 'GET')
  .then(d => {console.log("todo ok") // va ok si el username no existe
      

  })
  .catch(() => {console.log("Error en catch seeCourse");

  })

}