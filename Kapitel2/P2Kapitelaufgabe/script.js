"use strict";
var Kapitelaufgabe2Script;
(function (Kapitelaufgabe2Script) {
    //finding HTML Elements
    let imageDiv = document.getElementById("Selection");
    let imageDivFinished = document.getElementById("finished");
    let responseDiv = document.getElementById("serverResponse");
    let buttonSave = document.getElementById("save");
    let buttonCancel = document.getElementById("cancel");
    let buttonNew = document.getElementById("new");
    //neccesary for navigation
    let selectionTypeID = 0; //which Element is to be selected/displayed? 0=Klinge 1=Griff 2=Knauf
    //loading selected Elements aside  
    let imageKlinge = document.createElement("img");
    let imageGriff = document.createElement("img");
    let imageKnauf = document.createElement("img");
    imageKlinge.src = "";
    imageGriff.src = "";
    imageKnauf.src = "";
    function loadingImagesTo(div) {
        imageKlinge.className = "end";
        imageGriff.className = "end";
        imageKnauf.className = "end";
        div.appendChild(imageKlinge);
        div.appendChild(imageGriff);
        div.appendChild(imageKnauf);
    }
    // Choosing Element
    function handleClickSetChoice(_event) {
        let images = imageDiv.children;
        for (let i = 0; i < images.length; i++) {
            if (images.item(i) == _event.target) { //finding Element to be selected
                let prevImg = document.getElementsByClassName("selected");
                if (prevImg.item(0) != null) {
                    prevImg.item(0).className = ""; // unset previous selected Element
                }
                images.item(i).className = "selected";
                if (selectionTypeID == 0) {
                    imageKlinge.src = images.item(i).getAttribute("src"); //Get image src for Display aside
                }
                if (selectionTypeID == 1) {
                    imageGriff.src = images.item(i).getAttribute("src"); //Get image src for Display aside
                }
                if (selectionTypeID == 2) {
                    imageKnauf.src = images.item(i).getAttribute("src"); //Get image src for Display aside
                }
            }
        }
    }
    function addElementAuswahl(sword) {
        let imageElement = document.createElement("img");
        imageElement.src = sword.link;
        imageElement.addEventListener("click", handleClickSetChoice);
        imageDiv.appendChild(imageElement);
    }
    Kapitelaufgabe2Script.addElementAuswahl = addElementAuswahl;
    //DatenKlassen
    class SwordElement {
        constructor(_typeID, _link) {
            this.typeID = _typeID;
            this.link = _link;
        }
    }
    Kapitelaufgabe2Script.SwordElement = SwordElement;
    function elementsFromJSONString(jsonString, requestedTypeID) {
        let arrayFromJASON = JSON.parse(jsonString);
        Object.keys(arrayFromJASON).forEach(key => {
            if (key == "klinge" || key == "griff" || key == "knauf") {
                let elementsFromJSON = arrayFromJASON[key];
                elementsFromJSON.forEach(element => {
                    if (element.typeID == requestedTypeID) {
                        addElementAuswahl(new SwordElement(element.typeID, element.link));
                    }
                });
            }
        });
    }
    Kapitelaufgabe2Script.elementsFromJSONString = elementsFromJSONString;
    async function readElementsFromJSON(_path) {
        let response = await fetch(_path);
        let jsonString = await response.text();
        elementsFromJSONString(jsonString, selectionTypeID);
    }
    Kapitelaufgabe2Script.readElementsFromJSON = readElementsFromJSON;
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") { // read first selection set
        loadingImagesTo(imageDivFinished);
        readElementsFromJSON("data.json");
    }
    function nextSelection() {
        if (selectionTypeID < 2) { //is still there still an item to be selected?
            selectionTypeID += 1;
            let images = imageDiv.children;
            console.log("to delete" + images.length);
            for (let i = images.length - 1; i >= 0; i--) { // deleting existing selection-set
                images.item(i).remove();
                console.log("deleted" + i);
            }
            readElementsFromJSON("data.json");
        }
        else {
            window.open("EndSelection.html", "_self");
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") { //#region Button declaration for Selection page
        buttonSave.addEventListener("click", handleClickSave);
        function handleClickSave(_event) {
            let imgs = document.getElementsByClassName("selected");
            let imgToSave = "nothing selected!";
            if (imgs.item(0) != null) {
                imgToSave = imgs.item(0).getAttribute("src");
            }
            if (selectionTypeID == 0) {
                localStorage.setItem("klinge", imgToSave);
                console.log("saved!");
                nextSelection();
            }
            else if (selectionTypeID == 1) {
                localStorage.setItem("griff", imgToSave);
                console.log("saved!");
                nextSelection();
            }
            else if (selectionTypeID == 2) {
                localStorage.setItem("knauf", imgToSave);
                console.log("saved!");
                nextSelection();
            }
            else {
                console.log("Error: Selection could not be saved.");
            }
            console.log(imgToSave);
        }
        buttonCancel.addEventListener("click", handleClickCancel);
        function handleClickCancel(_event) {
            localStorage.clear();
            selectionTypeID = 0;
            let images = imageDiv.children;
            console.log("to delete" + images.length);
            for (let i = images.length - 1; i >= 0; i--) {
                images.item(i).remove();
                console.log("deleted" + i);
            }
            readElementsFromJSON("data.json");
            console.log("selection canceled!");
        }
    } //#endregion Button declaration for Selection page
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "EndSelection.html") {
        buttonNew.addEventListener("click", handleClickNew); // Button declaration for Display page
        function handleClickNew(_event) {
            localStorage.clear();
            selectionTypeID = 0;
            window.open("Select.html", "_self");
        }
        loadingImagesTo(imageDivFinished); // reading local storage for Display
        imageKlinge.src = localStorage.getItem("klinge");
        imageGriff.src = localStorage.getItem("griff");
        imageKnauf.src = localStorage.getItem("knauf");
        async function sendCache(url) {
            let browserCacheData = JSON.parse(JSON.stringify(localStorage));
            let query = new URLSearchParams(browserCacheData);
            url = url + "?" + query.toString();
            let response = await fetch(url);
            let responseText = await response.json();
            let responseDisplay = document.createElement("p");
            if (responseText.message != undefined) {
                responseDisplay.appendChild(document.createTextNode("Server-Antwort: " + responseText.message));
                responseDisplay.id = "message";
            }
            if (responseText.error != undefined) {
                responseDisplay.appendChild(document.createTextNode("Fehler: " + responseText.error));
                responseDisplay.id = "error";
            }
            responseDiv.appendChild(responseDisplay);
        }
        sendCache("https://gis-communication.herokuapp.com");
        //#endregion Sending Cache to Server
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") { // redirect from index.html
        localStorage.clear();
        window.open("Select.html", "_self");
    }
})(Kapitelaufgabe2Script || (Kapitelaufgabe2Script = {}));
//# sourceMappingURL=script.js.map