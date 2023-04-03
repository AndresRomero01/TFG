
document.addEventListener("DOMContentLoaded", () => {
    if (config.socketUrl) {
        let subs = ["/questionForStaff"];
        ws.initialize(config.socketUrl, subs);
        console.log("suscribiendose a /questionForStaff");

    } else {
        console.log("Not opening websocket: missing config", config)
    }



});


document.addEventListener("DOMContentLoaded", () => {

if (ws.receive) {
    const oldFn = ws.receive; // guarda referencia a manejador anterior
    ws.receive = (m) => {//reescribe lo que hace la funcion receive
        oldFn(m); // llama al manejador anterior En principio esto lo unico que hace es mostar por consola el objeto recibido
        if(!m["prueba"])
        {
            console.log("dato no recibido en ws.receive");
        }

        var html = `
        <div class="row questionDiv">
            <div class="col">`+m["subject"]+`</div>
            <div class="col">`+m["question"]+`</div>
            <div class="col">`+m["id"]+`</div>
        </div>
        `;

        let questionsList = document.getElementById("questionsList");
        questionsList.insertAdjacentHTML("beforebegin",html);
    }
}

});