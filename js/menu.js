addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', function(){
        sessionStorage.removeItem("save"); // mmm mirar que es...
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', function(){ // esto hay que cambiarlo hay que modificar la version de php por otra cosa, hay que eliminar el fetch
        fetch("./php/load.php",{
            method: "POST",
            body: "",
            headers: {"content-type":"application/json; charset=UTF-8"}
        })
        .then(response=>{
            if (response.ok) response.text();
            else trow("PHP connection fail");
        })
        .then(partida=>sessionStorage.save = partida)
        .catch(err=>sessionStorage.save = localStorage.save)
        .finally(()=>window.location.assign("./html/phasergame.html"));
    });

    document.getElementById('ranking').addEventListener('click', function(){
        window.location.assign("./html/puntuacions.html");
    });

    document.getElementById('exit').addEventListener('click', function(){
        console.warn("No es pot sortir!");
    });
});