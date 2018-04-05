var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

// assim que carregar a página, as funções são chamadas
$(function(){ // $(function) é um atalho para $(document).ready(function());
    atualizatamanhoFrase();
    iniciarContadores();
    iniciarCronometro();
    inicializaMarcadores();
    $("#reiniciar").click(reiniciarJogo);
    atualizaPlacar();
    
    $("#users").selectize({
        create: true,
        sortField: 'text'
    });
    
    $('.tooltip').tooltipster({
        trigger: "custom"
    });
});

function  atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo); 
}
 
function atualizatamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
    
}

function iniciarContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $('#contador-palavras').text(qtdPalavras);
        var qntCaracteres = conteudo.length;
        $("#contador-caracteres").text(qntCaracteres);
    });
}
function iniciarCronometro(){
    var tempoRest = $("#tempo-digitacao").text(); //função on chama o evento várias vezes                                   
    campo.one("focus", function(){               //função one chama o evento apenas uma vez
        var cronometroID = setInterval(function(){
            tempoRest--; // -1 segundo
            $("#tempo-digitacao").text(tempoRest);                 
            if(tempoRest < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        },1000); // faz a contagem em ms 
    });
}    
function finalizaJogo(){
    campo.attr("disabled", true); // desabilita a textarea para digitação
    campo.toggleClass("campo-desativado");
    inserePlacar();
}
function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);
        if(digitado == comparavel){
            campo.addClass("certo");
            campo.removeClass("errado");
        }else{
            campo.addClass("errado");
            campo.removeClass("certo");
        }
    });
} 

function reiniciarJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $('#contador-palavras').text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("errado");
    campo.removeClass("certo");
    campo.toggleClass("campo-desativado");
    iniciarCronometro();
}

