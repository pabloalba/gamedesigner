//Globals
let cardBackCanvas = null;
let cardBackCtx = null;
let cardBackImage = null;


let cardFrontCanvas = null;
let cardFrontCtx = null;
let cardFrontImage = null;
let listLayersFront = [];
let listLayersX = [];
let listLayersY = [];
let currentLayerFront = 0;

$( document ).ready(function() {
    initialize();
});

function initialize(){
    initializeCardBack();
    initializeCardFront();
}

function initializeCardBack(){
    $('#btnCardBackLoad').on('click', function (e) {
        reloadCardBack();
    });

    cardBackCanvas=document.getElementById("canvasBack");
    cardBackCtx=cardBackCanvas.getContext("2d");
    cardBackCtx.scale(0.5, 0.5);
    
    cardBackImage = $(".cardBackImage");

    cardBackImage.on('load', function (e) {
        cardBackCtx.drawImage(cardBackImage[0],0,0);
    });


    reloadCardBack();
}

function reloadCardBack(){
    cardBackCtx.clearRect(0, 0, 1000, 1000);
    let imgUrl = $(".cardBackFile").val();    
    cardBackImage.attr("src", imgUrl);    
}



function initializeCardFront(){
    $('#btnCardFrontReload').on('click', function (e) {
        reloadCardFront();
    });

    cardFrontCanvas=document.getElementById("canvasFront");
    cardFrontCtx=cardFrontCanvas.getContext("2d");
    cardFrontCtx.scale(0.5, 0.5);

    cardFrontImage = $(".cardFrontImage");

    cardFrontImage.on('load', function (e) {
        console.log(listLayersFront[currentLayerFront],listLayersX[currentLayerFront], listLayersY[currentLayerFront])
        cardFrontCtx.drawImage(cardFrontImage[0],listLayersX[currentLayerFront],listLayersY[currentLayerFront]);
        if (currentLayerFront < listLayersFront.length) {
            currentLayerFront += 1;
            cardFrontImage.attr("src", listLayersFront[currentLayerFront]);
        }
    });
}

function reloadCardFront(){
    cardFrontCtx.clearRect(0, 0, 1000, 1000);

    listLayersFront = [];
    listLayersX = [];
    listLayersY = [];
    currentLayerFront = 0;

    $(".cardFrontFile").each(function() {
        listLayersFront.push($(this).val());
    });

    $(".cardFrontX").each(function() {
        listLayersX.push($(this).val());
    });

    $(".cardFrontY").each(function() {
        listLayersY.push($(this).val());
    });

    cardFrontImage.attr("src", listLayersFront[currentLayerFront]);    
}

