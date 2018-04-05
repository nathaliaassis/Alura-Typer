$("#addFrase").click(fraseAleatoria);
$("#botao-buscar-frase").click(buscaFrase);
function fraseAleatoria(){
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFrase).fail(function(){
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);   
    })
    .always(function(){
        $("#spinner").toggle();
    });
}
function trocaFrase(data){
    var frase = $(".frase");
    var numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);
    atualizatamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseID = $("#seleciona-frase").val();
    var dados = { id: fraseID};
    $.get("http://localhost:3000/frases",dados, fraseBuscada).fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    }).always(function(){
        $("#spinner").toggle();
    });
}

function fraseBuscada(data){
   var frase = $(".frase");
   frase.text(data.texto);
   atualizatamanhoFrase();
   atualizaTempoInicial(data.tempo);
}