addEventListener('load', function() {
    document.getElementById('select').addEventListener('click', function(){
        window.location.assign("../../html/phasergame.html");
        sessionStorage.mode = document.getElementById('mode').value
    });
});