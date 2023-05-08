function prueba(e){
    console.log("prueba " + e.target.id);
}

function updateCategoryTitle(e){
    const catTitle = document.getElementById("categoryTitle");
    catTitle.innerText = e.target.innerText;
}

function defaultImg(e){
    try {
        // Load the image
        e.target.src = '/img/drawing.jpg'
        /* var img = document.createElement("img");
        img.src = "/img/courses/" + courseId + ".jpg";
        document.body.appendChild(img); */
      } catch (e) {
        // Handle the error silently
      }
    
}