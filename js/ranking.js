addEventListener('load', function() {
    var divList = document.getElementById('list_ranking');
    var listRank = (JSON.parse(localStorage.getItem("options"))).ranking;

    listRank.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    for (let i = 0; i < listRank.length; i++) {
        var newP = document.createElement('p');
        newP.innerText = i+1 + " - Nom: " + listRank[i][0] + " Puntos: " + listRank[i][1]
        divList.appendChild(newP);
    }    
});