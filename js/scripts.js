


var c = 0;
var t;
var timer_is_on = 0;
var totalPontos = 0;
var informacao = false;
var ponto = 0;
var JsonPersonagens = "";


// FUNCOES DE TIMER -- W3SCHOOLL
function timedCount() {
    c = c + 1;
    console.log(c);
    t = setTimeout(function(){ timedCount() }, 1000);
    if (c == 10) {
        stopCount();
    }
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}

function verInformacoes(elemento) {
    //console.log( $(this) );
    console.log( $(elemento).parent().html());
    var conteudoModal = $(elemento).prev().html();
    //$("body").prepend(conteudoModal);
    $(elemento).prev().toggle();

    $(elemento).addClass('info-checked');

    // alterando para somar menos pontos
    informacao = true;

}

// falta funcao para trazer fotos e colcoar de background na ordem
// falta gravar pontuacao no localstorage
// falta comparar pontuacao mininma e maxima


function EncontraNomeEposicao(btn) {

    console.log( $(btn).prev().prev().prev("div").children("span").eq(0).text());
    console.log( $(btn).prev("input").val());
    var nome = $(btn).prev("input").val();
    var posicao = $(btn).prev().prev().prev("div").children("span").eq(0).text();

    ComparaNomePersonagem(nome,posicao);
    
}



function EncontraInfoPersonagem() {       
    
    $.ajax({
      url: 'https://swapi.co/api/people/',
      success: function(data) {
        JsonPersonagens = data;
        //JsonPersonagens = data.results;
        //console.log(data);


            $.each(JsonPersonagens.results, function (index, value) {
                
                //console.log(key, value);

                $(".content").append("<div style='border:1px solid red; padding:20px;' id='Personagem" + index + "'> <div style='display:none;' id='infoPersonagem" + index + "'></div> <a href='#' onclick='verInformacoes(this);'>Ver Informacoes</a> <input style='border:1px solid red; padding:20px;' id='inputPersonagem" + index + "' type='text' class='basics'/> <input onclick='EncontraNomeEposicao(this);' style='border:1px solid red; cursor:pointer; padding:20px;' id='ButtonPersonagem" + index + "' type='button' value='ok' class='btnBusca'/>  </div>");
///
                $("#infoPersonagem" + index).append("<span class='index' style='display:none;'>" + index + "</span> ");
                $("#infoPersonagem" + index).append("<span class='name' style='display:none;'>" + value.name + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.gender + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.homeworld + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.birth_year + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.skin_color + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.hair_color + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.mass + "</span> ");
                $("#infoPersonagem" + index).append("<span>" + value.height + "</span> ");

                
                // REPETIR // REFATORAR
                //species
                //starships
                //vehicles
                //films

            });

            $( "input:text" ).keydown(function( event ) {
              if ( event.which == 13 ) {
               event.preventDefault();
               //console.log($(this).next("input:button").attr("disabled"));
               if ($(this).next("input:button").attr("disabled") != "disabled") {
                $(this).next("input:button").click();
               }

               else {
                console.log("Voce ja pontuou aqui!!")
               }
              }

            });


        },
        error: function(){
        alert('error!');
      }
    });
}



function ComparaNomePersonagem(nome,posicao) {

    var nomePosMinusculo = JsonPersonagens.results[posicao].name;
    nomePosMinusculo = nomePosMinusculo.toLowerCase()

    var objetoNome = nome;
    objetoNomeMinusculo = objetoNome.toLowerCase();

    alert(objetoNomeMinusculo);
    alert(nomePosMinusculo);    

    if (objetoNomeMinusculo == nomePosMinusculo) {
        console.log("Voce acertou o nome");

        if (informacao != true) {
            ponto = ponto + 10;    
        }else {
            ponto = ponto + 5;
        }

        console.log(informacao);
        console.log(ponto);

        informacao = false;

        $("#ButtonPersonagem" + posicao).attr("disabled","disabled");
        $("#Personagem" + posicao).css("border-color","green");

    }

    else {
        console.log("Voce errou o nome");
    }

}

function gravaLocalStorage() {

}

function iniciaJogo() {
    // start timer
}

function FinalizaJogo() {
    // pause timer
}
    

// A $( document ).ready() block.
$( document ).ready(function() {

    console.log( "Pronto para detonar!" );




    // larguraTela = $(window).width();
    // console.log ("Largura da tela é " + larguraTela);
    // alturaTela = $(window).height();
    // console.log ("Altura da tela é " + alturaTela);

    // console.log ("Informações utueis para saber se o cara esta no desktop, celular, tablet, iphone, android, safari, chrome, etc...")
    // console.log ("Browser CodeName: " + navigator.appCodeName );
    // console.log ("Browser Name: " + navigator.appName );
    // console.log ("Browser Version: " + navigator.appVersion );
    // console.log ("Cookies Enabled: " + navigator.cookieEnabled );
    // console.log ("Browser Language: " + navigator.language );
    // console.log ("Browser Online: " + navigator.onLine );
    // console.log ("Platform: " + navigator.platform );
    // console.log ("User-agent header: " + navigator.userAgent );

//console.log ("alterando altura do body para dar scroll... NAO SE ESQUEÇA DE DELETAR ESSA LINHA E E DE BAIXO");
//$("body").css("height","4000px");

// muito util para fazer menu fixos...
$( window ).scroll(function() {
    //var scrollTop = $( "html" );
    //var distanciaTopo = scrollTop.scrollTop();
  //  console.log( "distancia do topo: " + distanciaTopo );
});

//startCount();

EncontraInfoPersonagem();



    // plugins indicados

    /* http://idangero.us/swiper/ */  // use para swiper, carrosels, já é responsivo
    /* https://jqueryvalidation.org/ */  // use para para validação
    /* https://gist.github.com/diegoprates/5047663 */  // use para para traduzir automaticamente  as mensagens padrdão do jquery validate, só colar no fim do arquivo js, este ou o do jquery validate.
    /* https://igorescobar.github.io/jQuery-Mask-Plugin/ */  // mascara
    /*http://isotope.metafizzy.co/filtering.html*/   // Filtro com efeito css .. pode ser usado com select, link, button, li a, etc...
    /* https://jqueryui.com/selectmenu/ */   // select menu... eh o que apresetna menos bug... o ponto negativo eh a porrada de coisa que vem no css....
    /* http://adam.co/lab/jquery/customselect/ */   // esse nunca usei mais tem gente usando serve pra mesma coisa ... select box


});