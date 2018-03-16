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

    $("#btnAddImageLayer").on('click', function (e) {
        addImageLayer("aaa",1,2);
    });

    $("#btnAddTextLayer").on('click', function (e) {
        addTextLayer();
    });


    

    $( document ).on( 'click', '.toggle-show-layer', function (e) {
        toggleShowlayer(e.target);
    });

    $( document ).on( 'click', '.move-layer-up', function (e) {
        moveLayerUp(e.target);
    });

    $( document ).on( 'click', '.move-layer-down', function (e) {
        moveLayerDown(e.target);
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

    if (layer.hasClass("nodraw")){
        currentLayerFront += 1;
        processNextLayer();
    } else {
        
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

function toggleShowlayer(element){
    $(element).toggleClass( "fa-eye-slash" );
    $(element).toggleClass( "fa-eye" );

    $(element).parents(".layer").toggleClass("nodraw");
}

function moveLayerUp(element){
    let layer = $(element).parents(".layer");    
    layer.prev(".layer").insertAfter(layer);
}

function moveLayerDown(element){
    let layer = $(element).parents(".layer");
    layer.next(".layer").insertBefore(layer);
}

function addImageLayer(url, x, y){
    let layer = $(emptyImgLayer);
    let layerId = "layer" + new Date().getTime();    
    layer.find(".layer-name a").attr("href", "#"+layerId);
    layer.find(".panel-body").attr("id", layerId);
    layer.find(".cardFrontUrl").val(url);
    layer.find(".cardFrontX").val(x);
    layer.find(".cardFrontY").val(y);

    $("#layersForm").append(layer);
}

function addTextLayer(text, font, color, x, y, rotation){
    let layer = $(emptyTextLayer);
    let layerId = "layer" + new Date().getTime();    
    layer.find(".layer-name a").attr("href", "#"+layerId);
    layer.find(".panel-body").attr("id", layerId);
    layer.find(".cardFrontFont").val(font);
    layer.find(".cardFrontColor").val(color);
    layer.find(".cardFrontText").val(text);    
    layer.find(".cardFrontX").val(x);
    layer.find(".cardFrontY").val(y);
    layer.find(".cardFrontRotation").val(rotation);

    $("#layersForm").append(layer);

}

let emptyImgLayer = `
<div class="panel layer layer-img">
        <div class="panel-heading">
                <div>
                    <span class="layer-name">
                        <a data-toggle="collapse">Image Layer</a>
                    </span>
                </div>
                <div>
                    <span class="layer-reorder">
                            <span class="fa fa-eye layer-ctrl toggle-show-layer"></span>
                            &nbsp;
                            <span class="fa fa-arrow-up layer-ctrl move-layer-up"></span>
                            &nbsp;
                            <span class="fa fa-arrow-down layer-ctrl move-layer-down"></span>
                    </span>
                </div>                
        </div>
        <div class="panel-body collapse show">
                <div class="form-group form-inline">
                        <label for="cardFrontUrl">URL</label>
                        <input type="text" class="form-control cardFrontUrl" value="">
                </div>
                <div class="form-group form-inline">
                        <label for="cardFrontX">X</label>
                        <input type="number" class="form-control cardFrontX" value="0">
                        <label for="cardFrontY">Y</label>
                        <input type="number" class="form-control cardFrontY" value="0">
                </div>
        </div>
    </div>
`;

let emptyTextLayer = `
<div class="panel panel-default  layer layer-text">
    <div class="panel-heading">
        <div>
            <span class="layer-name">
                <a data-toggle="collapse">Text Layer</a>
            </span>
        </div>
        <div>
            <span class="layer-reorder">
                    <span class="fa fa-eye layer-ctrl toggle-show-layer"></span>
                    &nbsp;
                    <span class="fa fa-arrow-up layer-ctrl move-layer-up"></span>
                    &nbsp;
                    <span class="fa fa-arrow-down layer-ctrl move-layer-down"></span>
            </span>
        </div>
    </div>
    <div class="panel-body collapse show" id="">
            <div class="form-group form-inline">
                    <label for="cardFrontFont">Font</label>
                    <input type="text" class="form-control cardFrontFont" value="48px Arial">

                    <label for="cardFrontColor">Color</label>
                    <input type="color" class="form-control cardFrontColor" value="#000000">
            </div>
            <div class="form-group form-inline">
            </div>
            <div class="form-group form-inline">
                <label for="cardFrontText">Text</label>
                <input type="text" class="form-control cardFrontText" value="">
            </div>
            <div class="form-group form-inline">
                    <label for="cardFrontUrl">X</label>
                    <input type="number" class="form-control cardFrontX" value="0">
                    <label for="cardFrontUrl">Y</label>
                    <input type="number" class="form-control cardFrontY" value="0">
                    <label for="cardFrontUrl">Rotation</label>
                    <input type="number" class="form-control cardFrontRotation" value="0">
            </div>
    </div>
</div>
`;

