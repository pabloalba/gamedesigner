//Globals

let cardFrontCanvas = null;
let cardFrontCtx = null;
let listLayersFront = [];
let currentLayerFront = 0;
let currentXFront = 0;
let currentYFront = 0;
let currentFonts = "";

function initializeCardFront(){
    $('#btnCardFrontReload').on('click', function (e) {
        reloadCardFront();
    });

    $('#front600').on('change', function (e) {
        resizeCardFront("v");
    });

    $('#front825').on('change', function (e) {
        resizeCardFront("h");
    });

    $("#cardFrontFonts").on('blur', function (e) {
        reloadFonts();
    });

    $("#sampleCard").on('change', function (e) {
        reloadCardFront();
    });


    cardFrontCanvas=document.getElementById("canvasFront2");
    cardFrontCtx=cardFrontCanvas.getContext("2d");
    cardFrontCtx.scale(0.5, 0.5);

    cardFrontCanvas=document.getElementById("canvasFront1");
    cardFrontCtx=cardFrontCanvas.getContext("2d");
    cardFrontCtx.scale(0.5, 0.5);    
}

function reloadFonts(){
    let fontscss = $("#cardFrontFonts").val();
    $("#font-styles").attr("href", fontscss);
}

function resizeCardFront(mode){
    cardFrontCtx.clearRect(0, 0, 1000, 1000);
    cardFrontCanvas.classList.add("hidden");

    if (mode=="v"){
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

    let cardData = cardsData[$('#sampleCard').val()];

    if (layer.hasClass( "layer-img" )){
        let fileName = layer.find(".cardFrontUrl").val();

        for (let i=0;i<varNames.length;i++){
            console.log("Replacing "+varNames[i]);
            fileName = fileName.replace("${"+varNames[i]+"}", cardData[varNames[i]])
        }

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
        let color = layer.find(".cardFrontColor").val();
        let rotation = layer.find(".cardFrontRotation").val() * Math.PI / 180;
        let text = layer.find(".cardFrontText").val();

        for (let i=0;i<varNames.length;i++){
            text = text.replace("${"+varNames[i]+"}", cardData[varNames[i]])
        }

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

function updateSampleCardList(){
    let oldValue = $('#sampleCard').val();
    console.log(oldValue);
    $('#sampleCard').empty();
    $.each(cardsData, function(index, value) {
        $('#sampleCard')
            .append($("<option></option>")
                       .attr("value",index)
                       .text(value.name)); 
    });
    if (oldValue!=null){
        $('#sampleCard').val(oldValue);
    }
    reloadCardFront();

}

