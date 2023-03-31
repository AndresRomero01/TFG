function prueba(e){
    console.log("prueba " + e.target.id);
}

function updateCategoryTitle(e){
    const catTitle = document.getElementById("categoryTitle");
    catTitle.innerText = e.target.innerText;
}