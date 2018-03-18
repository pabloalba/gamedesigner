//Globals
let cardsData = [];
let varNames = [];
let emptyData = [];
let frontLayersData = [];
let ready = false;

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
    waitingDialog.show('Loading deck');
    ready = false;
    cardsData = data["cardsData"];
    frontLayersData = data["frontLayersData"];
    varNames = data["varNames"];
    emptyData = {};
    for (let i=0;i<varNames.length;i++){
        emptyData[varNames[i]] = "";
    }    


    
    regenerateFrontConfig(data["frontConfig"]["mode"], data["frontConfig"]["fonts"]);
    
    regenerateFrontLayers();
    regenerateTable();
    ready = true;
    reloadCardFront()


    setTimeout(function () {
        reloadCardFront()
        waitingDialog.hide();
    }, 2000);
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
    },

    "frontLayersData": [
        {
            "type": "image",
            "show": true,
            "collapse": true,
            "url": "https://www.dropbox.com/s/vrpgh14b1kw271s/base.png?dl=0",
            "x": 0,
            "y": 0
        },
        {
            "type": "image",
            "show": true,
            "collapse": true,
            "url": "https://www.dropbox.com/s/a8aeycs0fqckqfw/circle.png?dl=0",
            "x": 0,
            "y": 0
        },
        {
            "type": "image",
            "show": true,
            "collapse": true,
            "url": "https://www.dropbox.com/s/uqrjt58s8j76msn/damage.png?dl=0",
            "x": 0,
            "y": 0
        },
        {
            "type": "image",
            "show": true,
            "collapse": true,
            "url": "${image}",
            "x": 0,
            "y": 0
        },
        {
            "type": "text",
            "show": true,
            "collapse": true,
            "font": "80px Rammetto One",
            "color": "#ffffff",
            "text": "${title}",
            "x": 75,
            "y": 150,
            "rotation": 0
        },
        {
            "type": "text",
            "show": true,
            "collapse": true,
            "font": "60px Monserrat",
            "color": "#000000",
            "text": "${strength}",
            "x": 712,
            "y": 195,
            "rotation": 0
        }
    ]
}


