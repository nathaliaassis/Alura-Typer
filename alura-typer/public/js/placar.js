$("#btnPlacar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var numPalavras = $("#contador-palavras").text();
    var usuario = $("#users").val();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".btn-remover").click(removerLinha);
    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    },1000);
}
function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("btn-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}
function removerLinha(){
    event.preventDefault();
    var linha =  $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000);
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(700);

}
function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody > tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });
    var dados = {
        placar: placar 
    };
    $.post("http://localhost:3000/placar",dados, function(){
        $('.tooltip').tooltipster("open").tooltipster("content","Sucesso ao sincronizar");
    }).fail(function(){
        $('.tooltip').tooltipster("open").tooltipster("content","Falha ao sincronizar");
    }).always(function(){
        setTimeout(function(){
            $('.tooltip').tooltipster("close");
        },1200);
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".btn-remover").click(removerLinha);
            $("tbody").append(linha);
        });
    });
}