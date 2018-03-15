


var c = 120;
var t;
var timer_is_on = 0;
var totalPontos = 0;
var informacao = false;
var ponto = 0;
var JsonPersonagens = "";


// FUNCOES DE TIMER -- W3SCHOOLL
function timedCount() {
    c = c - 1;
    //console.log(c);
    
    //console.log(Math.floor(c/60));
    var minutos = Math.floor(c/60);
    var segundos = c%60;
    //console.log(c%60);

    $("#tempo").html("<b>Tempo Restante:</b> " + minutos + "min " +segundos+ " segundos");
    t = setTimeout(function(){ timedCount() }, 1000);
    if (c == 0) {
        stopCount();
    }
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }

    //iniciaJogo();
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    FinalizaJogo();
}

function verInformacoes(elemento) {
    //console.log( $(this) );
    //console.log( $(elemento).parent().html());
    var conteudoModal = $(elemento).prev().html();
    //$("body").prepend(conteudoModal);
    $(elemento).prev().toggle();

    $(elemento).addClass('info-checked');

    // alterando para somar menos pontos
    informacao = true;

}

function EncontraNomeEposicao(btn) {
    //console.log( $(btn).prev().prev().prev("div").children("span").eq(0).text());
    //console.log( $(btn).prev("input").val());
    var nome = $(btn).prev("input").val();
    var posicao = $(btn).prev().prev().prev("div").children("span").eq(0).text();
    ComparaNomePersonagem(nome,posicao);
}




function EncontraFilmePersonagem(urlFilmes,pos) {   

           // console.log(urlFilmes);
           //var meusFilmes = [];

           $("#infoPersonagem" + pos).append("<br /><span><b>Filmes:<b/></span><br /> ");  


            $.each(urlFilmes, function (index, value) {
                
               // console.log(index, value);

                $.ajax({
                  url: value,
                  success: function(data) {

                    JsonFilmePersonagem = data;

                     //meusFilmes.push(JsonFilmePersonagem.title);

                    $("#infoPersonagem" + pos).append("<span>- " + JsonFilmePersonagem.title + "</span><br /> ");  

                    //console.log(meusFilmes);                      
                    
                    },
                    error: function(){
                    alert('Impossivel recuperar filmes, comece de novo.');
                  }
                });    

            });   

   }



function EncontraInfoPersonagem() {       
    
    $.ajax({
      url: 'https://swapi.co/api/people/',
      success: function(data) {

        // COMECANDO A CONTAR O TEMPO DEPOIS DA REPOSTA DO AJAX
        startCount();
        
        JsonPersonagens = data;
        
        //JsonPersonagens = data.results;
        //console.log(data);

            $.each(JsonPersonagens.results, function (index, value) {
                
                //console.log(index, value);

                $(".content").append("<div class='holder' id='Personagem" + index + "'> <img src='images/" + index + ".png' alt='' /> <div style='display:none;' class='infoPersonagem' id='infoPersonagem" + index + "'></div> <a href='#' onclick='verInformacoes(this);return false;'>Ajuda?</a><input class='form-control' placeholder='Nome do Personagem' id='inputPersonagem" + index + "' type='text' class='basics'/> <input onclick='EncontraNomeEposicao(this);' id='ButtonPersonagem" + index + "' type='button' value='Validar' class=' btn btn-primary btnBusca'/>  </div>");
                $("#infoPersonagem" + index).append("<span class='index' style='display:none;'>" + index + "</span> ");
                $("#infoPersonagem" + index).append("<span class='name' style='display:none;'>" + value.name + "</span> ");
                $("#infoPersonagem" + index).append("<span>Genero: " + value.gender + "</span><br /> ");
                $("#infoPersonagem" + index).append("<span>Ano de nascimento: " + value.birth_year + "</span><br /> ");
                $("#infoPersonagem" + index).append("<span>Cor da pele: " + value.skin_color + "</span><br /> ");
                $("#infoPersonagem" + index).append("<span>Cor do Cabelo: " + value.hair_color + "</span><br /> ");
                $("#infoPersonagem" + index).append("<span>Peso: " + value.mass + "kg</span><br /> ");
                $("#infoPersonagem" + index).append("<span>Altura:" + value.height + "cm</span><br /> ");

                var pos = index;

                EncontraFilmePersonagem(JsonPersonagens.results[index].films,pos);            
                // REPETIR ESSA FUNCAO PARA OS DEMAIS, POIS A RESPOTA MUDA
                //species
                //starships
                //vehicles                

            });

            $( "input:text" ).keydown(function( event ) {
              if ( event.which == 13 ) {
               event.preventDefault();

               //console.log($(this).next("input:button").attr("disabled"));
               if ($(this).next("input:button").attr("disabled") != "disabled") {
                   //console.log($(this).prev().hasClass("info-checked"));
                    $(this).next("input:button").click();
               }

               else {
                console.log("Voce ja pontuou aqui!!")
               }
              }

            });            


        },
        error: function(){
        alert('viIIIIISHHH A API está zuada! --  tente de novo');
      }
    });
}


function ComparaNomePersonagem(nome,posicao) {

    if (nome == "") {
        alert ("Informe o nome do personagem");
        return false;
    }
    
    var perguntasCorretas = 0;

    //console.log( $("#Personagem" + posicao).children("a"));
    //controlando o item de informacao apenas quando clicado
    if ( $("#Personagem" + posicao).children("a").hasClass("info-checked")   ) {
    informacao = true;
    } else {
    informacao = false;
    }

    //console.log(informacao);


    var nomePosMinusculo = JsonPersonagens.results[posicao].name;
    nomePosMinusculo = nomePosMinusculo.toLowerCase()

    var objetoNome = nome;
    objetoNomeMinusculo = objetoNome.toLowerCase();

    //alert(objetoNomeMinusculo);
    //alert(nomePosMinusculo);    

    if (objetoNomeMinusculo == nomePosMinusculo) {
        console.log("Voce acertou o nome");        

        if (informacao != true) {
            ponto = ponto + 10;    
        }else {
            ponto = ponto + 5;
        }

        //console.log(informacao);
        //console.log(ponto);
        $("#ponto").html("<b>Total de Pontos:</b> " + ponto);

        informacao = false;

        $("#ButtonPersonagem" + posicao).attr("disabled","disabled");
        $("#Personagem" + posicao).removeClass("border border-danger");   
        $("#Personagem" + posicao).removeClass("shake animated");   
        $("#Personagem" + posicao).addClass("border border-success"); 
        $("#Personagem" + posicao).addClass("flash animated");        

    }

    else {
        console.log("Voce errou o nome");
        $("#Personagem" + posicao).removeClass("shake animated");
        $("#Personagem" + posicao).removeClass("border border-success");
        $("#Personagem" + posicao).addClass("border border-danger");
        $("#Personagem" + posicao).addClass("shake animated");
    }


    // VERIFICANDO SE O CARA NAO GANHOU ANTES DO TEMPO ACABAR ...
    $.each( $('input:button'), function (index, value) { 
      if ($(this).attr("disabled") == "disabled") {
        perguntasCorretas =  perguntasCorretas + 1;
      }
    });   

    if (perguntasCorretas == 10) {
        // PARANDO O TIMER PARA DAR GAME OVER
        stopCount();
        //FinalizaJogo();
    }      
}


function iniciaJogo() {
    $("a.start").fadeOut(0);
    $("a.restart").fadeIn(0);
    EncontraInfoPersonagem();
}

function FinalizaJogo() {
    alert("Game Over! Pontuacao Final: " + ponto);
    $("input.form-control").attr("disabled","disabled");
    $("input.btnBusca").attr("disabled","disabled");
    gravaLocalStorage();
}

function gravaLocalStorage() {

    var pontoPartida = ponto;
    var totalGeral = localStorage.getItem("totalGeral");

    if (totalGeral == undefined || totalGeral == null) {

        localStorage.setItem('totalGeral', ponto);

        totalGeral = localStorage.getItem('totalGeral');

    }

    else {

            if (totalGeral < ponto) {
            localStorage.setItem('totalGeral', ponto);
            totalGeral = localStorage.getItem("totalGeral");
            
        }    
    }

    alert ("Nesta partida voce fez " + ponto + " -- Seu melhor é " + totalGeral);    

}
    

// A $( document ).ready() block.
$( document ).ready(function() {

    console.log( "Pronto para detonar!" );

    $.fn.extend({
      animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
          var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
          };

          for (var t in animations) {
            if (el.style[t] !== undefined) {
              return animations[t];
            }
          }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);

          if (typeof callback === 'function') callback();
        });

        return this;
      },
    });


});