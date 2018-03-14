


var c = 0;
var t;
var timer_is_on = 0;
var totalPontos = 0;


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
}


var JsonPersonagens = "";
function EncontraInfoPersonagem() {       
    
    $.ajax({
      url: 'https://swapi.co/api/people/',
      success: function(data) {
        JsonPersonagens = data;
        //JsonPersonagens = data.results;
        //console.log(data);
            $.each(JsonPersonagens.results, function (index, value) {
                
                //console.log(key, value);

                $(".content").append("<div style='border:1px solid red; padding:20px;' id='Personagem" + index + "'> <div style='display:none;' id='infoPersonamgem" + index + "'></div> <a href='#' onclick='verInformacoes(this);'>Ver Informacoes</a> <input type='text' class='basics'/>  </div>");

                $("#infoPersonamgem" + index).append("<span class='name' style='display:none;'>" + value.name + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.gender + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.homeworld + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.birth_year + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.skin_color + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.hair_color + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.mass + "</span> ");
                $("#infoPersonamgem" + index).append("<span>" + value.height + "</span> ");

                //species
                //starships
                //vehicles
                //films

            });

            var options = {
                data:  JsonPersonagens.results,
                getValue: "name",
            };            
            $(".basics").easyAutocomplete(options);



        },
        error: function(){
        alert('error!');
      }
    });
}


//      swiper.appendSlide('<div class="swiper-slide">Slide ' + "teste" + '</div>');

function ExibeInfoPersonagem() {

}



function ComparaNomePersonagem(nome,posicao) {

    if (nome == JsonPersonagens.results[posicao].name) {
        console.log("Voce acertou o nome");
    }

    else {
        console.log("Voce errou o nome");
    }

}


function SomaPontoSemDuvida (){

}

function somaPontoComDuvida() {
    
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