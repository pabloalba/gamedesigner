//Globals
let cardBackCanvas = null;
let cardBackCtx = null;
let cardBackImage = null;

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
