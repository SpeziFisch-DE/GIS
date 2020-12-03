"use strict";
var Kapitelaufgabe2Script;
(function (Kapitelaufgabe2Script) {
    //finding HTML Elements
    let imageDiv = document.getElementById("Selection");
    let imageDivFinished = document.getElementById("finished");
    let buttonSave = document.getElementById("save");
    let buttonCancel = document.getElementById("cancel");
    let buttonNew = document.getElementById("new");
    //neccesary for navigation
    let selectionTypeID = 0; //which Element is to be selected? 0=Klinge 1=Griff 2=Knauf
    //loading selected Elements aside        
    let imageKlinge = document.createElement("img");
    let imageGriff = document.createElement("img");
    let imageKnauf = document.createElement("img");
    imageKlinge.src = "";
    imageGriff.src = "";
    imageKnauf.src = "";
    imageKlinge.className = "end";
    imageGriff.className = "end";
    imageKnauf.className = "end";
    imageDivFinished.appendChild(imageKlinge);
    imageDivFinished.appendChild(imageGriff);
    imageDivFinished.appendChild(imageKnauf);
    //#region Choosing Element
    function handleClickSetChoice(_event) {
        let images = imageDiv.children;
        for (let i = 0; i < images.length; i++) {
            if (images.item(i) == _event.target) { //finding Element to be selected
                let prevImg = document.getElementsByClassName("selected");
                if (prevImg.item(0) != null) {
                    prevImg.item(0).className = "";
                } // unset previous selected Element
                images.item(i).className = "selected";
                if (selectionTypeID == 0) {
                    imageKlinge.src = images.item(i).getAttribute("src");
                }
                if (selectionTypeID == 1) {
                    imageGriff.src = images.item(i).getAttribute("src");
                }
                if (selectionTypeID == 2) {
                    imageKnauf.src = images.item(i).getAttribute("src");
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
    //#endregion
    //#endregion
    //DatenKlassen
    class SwordElement {
        constructor(_typeID, _link) {
            this.typeID = _typeID;
            this.link = _link;
        }
    }
    Kapitelaufgabe2Script.SwordElement = SwordElement;
    function elementsFromJSON(jsonString, requestedTypeID) {
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
    Kapitelaufgabe2Script.elementsFromJSON = elementsFromJSON;
    async function readElementsFromJSON(_path) {
        let response = await fetch(_path);
        let jsonString = await response.text();
        elementsFromJSON(jsonString, selectionTypeID);
    }
    Kapitelaufgabe2Script.readElementsFromJSON = readElementsFromJSON;
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") {
        readElementsFromJSON("data.json");
    }
    function nextSelection() {
        if (selectionTypeID < 2) {
            selectionTypeID += 1;
            let images = imageDiv.children;
            console.log("to delete" + images.length);
            for (let i = images.length - 1; i >= 0; i--) {
                images.item(i).remove();
                console.log("deleted" + i);
            }
            readElementsFromJSON("data.json");
        }
        else {
            window.open("EndSelection.html", "_self");
        }
    }
    //#region Button Click Handler
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") {
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
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "EndSelection.html") {
        buttonNew.addEventListener("click", handleClickNew);
        function handleClickNew(_event) {
            localStorage.clear();
            selectionTypeID = 0;
            window.open("Select.html", "_self");
        }
        //reading local storage
        let imageKlinge = document.createElement("img");
        let imageGriff = document.createElement("img");
        let imageKnauf = document.createElement("img");
        imageKlinge.src = localStorage.getItem("klinge");
        imageGriff.src = localStorage.getItem("griff");
        imageKnauf.src = localStorage.getItem("knauf");
        imageKlinge.className = "end";
        imageGriff.className = "end";
        imageKnauf.className = "end";
        imageDivFinished.appendChild(imageKlinge);
        imageDivFinished.appendChild(imageGriff);
        imageDivFinished.appendChild(imageKnauf);
        async function sendCache(url) {
            let browserCacheData = JSON.parse(localStorage.getItem("k"));
            let query = new URLSearchParams(browserCacheData);
            url = url + "?" + query.toString();
            await fetch(url);
        }
    }
})(Kapitelaufgabe2Script || (Kapitelaufgabe2Script = {}));
//# sourceMappingURL=script.js.map