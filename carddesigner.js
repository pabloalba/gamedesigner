//Globals
let cardBackCanvas = null;
let cardBackCtx = null;
let cardBackImage = null;


let cardFrontCanvas = null;
let cardFrontCtx = null;
let listLayersFront = [];
let currentLayerFront = 0;
let currentXFront = 0;
let currentYFront = 0;

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

    $('#front600').on('change', function (e) {
        resizeCardFront(300, 413);
    });

    $('#front825').on('change', function (e) {
        resizeCardFront(413, 300);
    });


    cardFrontCanvas=document.getElementById("canvasFront2");
    cardFrontCtx=cardFrontCanvas.getContext("2d");
    cardFrontCtx.scale(0.5, 0.5);

    cardFrontCanvas=document.getElementById("canvasFront1");
    cardFrontCtx=cardFrontCanvas.getContext("2d");
    cardFrontCtx.scale(0.5, 0.5);    
}

function resizeCardFront(w, h){
    cardFrontCtx.clearRect(0, 0, 1000, 1000);
    cardFrontCanvas.classList.add("hidden");

    if (w==300){
        cardFrontCanvas=document.getElementById("canvasFront1");
        cardFrontCtx=cardFrontCanvas.getContext("2d");
    } else {
        cardFrontCanvas=document.getElementById("canvasFront2");
        cardFrontCtx=cardFrontCanvas.getContext("2d");
    }

    cardFrontCanvas.classList.remove("hidden");
}

function reloadCardFront(){
    cardFrontCtx.clearRect(0, 0, 1000, 1000);

    listLayersFront = $(".layer");    
    currentLayerFront = 0;

    processNextLayer();
}

function processNextLayer(){
    let layer = $(listLayersFront[currentLayerFront]);
    
    let x = layer.find(".cardFrontX").val()
    let y = layer.find(".cardFrontY").val()

    if (layer.hasClass( "layer-img" )){
        let fileName = layer.find(".cardFrontFile").val();

        fileName = fileName.replace("https://www.dropbox.com", "https://dl.dropboxusercontent.com/.");

        console.log("Process image file:"+fileName);
        let img = new Image();
        img.onload = function () {
            console.log("Loaded!");
            cardFrontCtx.drawImage(img,x,y);
            console.log("Drawed!");
            if (currentLayerFront < listLayersFront.length) {
                currentLayerFront += 1;
                processNextLayer();
            }
        }
        img.src = ("src", fileName);
    } else if (layer.hasClass( "layer-text" )){
        let font = layer.find(".cardFrontFont").val();
        let text = layer.find(".cardFrontText").val();
        let color = layer.find(".cardFrontColor").val();
        let rotation = layer.find(".cardFrontRotation").val() * Math.PI / 180;

        //Load fonts
        //document.write('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Rammetto+One">');
        
        cardFrontCtx.save();
        cardFrontCtx.translate(x, y);
        cardFrontCtx.rotate(rotation);
        cardFrontCtx.font = font;
        cardFrontCtx.fillStyle = color;        
        cardFrontCtx.fillText(text,0,0); 
        cardFrontCtx.restore();

        if (currentLayerFront < listLayersFront.length) {
            currentLayerFront += 1;
            processNextLayer();
        }
    }



}

