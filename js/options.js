var options = function(){
    const default_options = {
        pairs:2,
        difficulty:'normal',
        leveldif:1,
        pointRanking:0,
        name: 'Usuari 1'
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var leveldif = $('#leveldif');
    var name = $('#name');

    var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    leveldif.val(options.leveldif);
    name.val(options.name);
    pairs.on('change',()=>options.pairs = Number(pairs.val()));
    difficulty.on('change',()=>options.difficulty = difficulty.val());
    leveldif.on('change',()=>options.leveldif = Number(leveldif.val()));
    name.on('change',()=>options.name = name.val());

    return { 
        applyChanges: function(){
            options.pointRanking = 0;
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            options.leveldif = default_options.leveldif;
            options.name = default_options.name;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            leveldif.val(options.leveldif);
            name.val(options.name);
        }
    }
}();

$('#default').on('click',function(){
    options.defaultValues();
});

$('#apply').on('click',function(){
    options.applyChanges(); 
    sessionStorage.mode = document.getElementById('mode').value
    console.log(typeof options.name);
    console.log(options.name);
    if (typeof options.name == undefined){
        alert("Requiere añadir nombre de jugador!!!");
    } else {
        //window.location.assign("../../html/phasergame.html");
    }
    
});