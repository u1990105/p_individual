var options = function(){
    const default_options = {
        pairs:2,
        difficulty:'normal',
        leveldif:1,
        pointRanking:0,
        nickname: 'Usuari 1'
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var leveldif = $('#leveldif');
    var nickname = $('#nickname');

    var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    leveldif.val(options.leveldif);
    nickname.val(options.nickname);
    pairs.on('change',()=>options.pairs = Number(pairs.val()));
    difficulty.on('change',()=>options.difficulty = difficulty.val());
    leveldif.on('change',()=>options.leveldif = Number(leveldif.val()));
    nickname.on('change',()=>options.nickname = nickname.val());

    console.log(localStorage.ranking)

    if (localStorage.ranking.length == 0){
        console.log("1")
        options.ranking = []
    }

    return { 
        applyChanges: function(){
            options.pointRanking = 0;
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            options.leveldif = default_options.leveldif;
            options.nickname = default_options.nickname;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            leveldif.val(options.leveldif);
            nickname.val(options.nickname);
        }
    }
}();

$('#default').on('click',function(){
    options.defaultValues();
});

$('#apply').on('click',function(){
    options.applyChanges(); 
    sessionStorage.mode = document.getElementById('mode').value;
    if (document.getElementById('nickname').value == ""){
        alert("Requiere añadir nombre de jugador!!!");
    } else {
        window.location.assign("../../html/phasergame.html");
    }
    
});