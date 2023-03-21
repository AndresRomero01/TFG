/* 

var nTabs = 8;

var widthTab = (100/nTabs) + "%";
document.querySelector('.wrapper .navPropia .tab').style.width = widthTab;

function getChecked(e){
    console.log("hola");

    var left = 0 + "%";
    console.log("left: " + left);
    //document.querySelector('.wrapper .navPropia #home:checked ~ .tab').style.left= left;

    let p = document.querySelector('.home').offsetWidth + 7 +"px";
    document.querySelector('.wrapper .navPropia #home:checked ~ .tab').style.width= p;
}
function getChecked2(e){
    console.log("hola2");

    var left = (100/nTabs)*1 + "%";
    console.log("left: " + left);

    let p = document.querySelector('.home').offsetWidth + 7 + "px";
    console.log("width: " + p);
    let w = document.querySelector('.inbox').offsetWidth;

    
    document.querySelector('.wrapper .navPropia #inbox:checked ~ .tab').style.left= p;
    document.querySelector('.wrapper .navPropia #inbox:checked ~ .tab').style.width= w;


}

function getChecked3(e){
    console.log("hola3");

    var left = (100/nTabs)*2 + "%";
    document.querySelector('.wrapper .navPropia #contact:checked ~ .tab').style.left= left;

    let p = document.querySelector('.home').offsetWidth + 7 + "px";
    document.querySelector('.wrapper .navPropia #contact:checked ~ .tab').style.width= p;
}
function getChecked4(e){
    console.log("hola4");

    var left = (100/nTabs)*3 + "%";
    document.querySelector('.wrapper .navPropia #heart:checked ~ .tab').style.left= left;
}

function getChecked5(e){
    console.log("hola5");

    var left = (100/nTabs)*4 + "%";
    document.querySelector('.wrapper .navPropia #about:checked ~ .tab').style.left= left;
}

function getChecked6(e){
    console.log("hola5");

    var left = (100/nTabs)*5 + "%";
    document.querySelector('.wrapper .navPropia #prueba:checked ~ .tab').style.left= left;
}

function getChecked7(e){
    console.log("hola7");

    var left = (100/nTabs)*6 + "%";
    document.querySelector('.wrapper .navPropia #prueba2:checked ~ .tab').style.left= left;
}

function getChecked8(e){
    console.log("hola7");

    var left = (100/nTabs)*7 + "%";
    document.querySelector('.wrapper .navPropia #prueba3:checked ~ .tab').style.left= left;
}



 */