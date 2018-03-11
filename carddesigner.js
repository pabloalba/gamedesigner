//Globals
let cardsData = [];
let varNames = [];
let emptyData = [];

$( document ).ready(function() {
    initialize();
});

function initialize(){
    initializeCardList();
    initializeCardBack();
    initializeCardFront();

    loadDeck(sampleData);
}

function loadDeck(data){
    cardsData = data["cardsData"];
    varNames = data["varNames"];
    emptyData = {};
    for (let i=0;i<varNames.length;i++){
        emptyData[varNames[i]] = "";
    }    

    

    if (data["frontConfig"]["mode"] == "v") {
        $("#front600").click();
    } else {
        $("#front825").click();
    }

    $("#cardFrontFonts").val(data["frontConfig"]["fonts"]);
    reloadFonts();

    regenerateTable();
    
}


let sampleData = {
    "deckName": "Animales",
    "varNames": ["name", "title", "strength", "image"],
    "cardsData": [
        {
            "name": "Paca",
            "title": "Paca",
            "strength": "1",
            "image": "https://www.dropbox.com/s/00ei8pzgcfsg5p3/paca.png?dl=0"
        },
        {
            "name": "Boa",
            "title": "Boa",
            "strength": "2",
            "image": "https://www.dropbox.com/s/k1ljo6s9zy933ng/boa.png?dl=0"
        }
    ],
    "frontConfig": {
        "mode": "h",
        "fonts": "https://fonts.googleapis.com/css?family=Montserrat|Rammetto+One"
    }
}
