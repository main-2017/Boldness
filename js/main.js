// Scripts principales

//Video Background Settings
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}

//Money loader

//Obtiene el precio actual de la crytomoneda y la inserta en la vista
function actualPrice(crypto, cash, id){
  	var value;
  	$.get('https://api.coinmarketcap.com/v1/ticker/'+crypto+'/?convert='+cash+'')
	   .done(function(data){
	   		var content = data;
	   		value = content[0].price_usd;
	   		changeP = parseFloat(content[0].percent_change_1h);
	   		console.log(changeP);
			$(id).text(value);
			if (changeP > 0) {
				$(id).css("color","#00cc00");
			}else{
				$(id).css("color","#FF0000");
			}
	   });
  }

//Ejecuta al cargar la pagina
$(document).ready(function(){
	actualPrice('bitcoin','USD', '#btc');
	actualPrice('ethereum','USD', '#eth');
	actualPrice('bitcoin-cash','USD', '#bch');
	actualPrice('ripple','USD', '#xrp');

//Ejecuta cada 5 minutos	
	setInterval(function(){
		actualPrice('bitcoin','USD', '#btc');
		actualPrice('ethereum','USD', '#eth');
		actualPrice('bitcoin-cash','USD', '#bch');
		actualPrice('ripple','USD', '#xrp');
	},500000);
});

