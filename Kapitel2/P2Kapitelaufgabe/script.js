"use strict";
var Kapitelaufgabe2Script;
(function (Kapitelaufgabe2Script) {
    //finding HTML Elements
    let imageDiv = document.getElementById("Selection");
    let buttonSave = document.getElementById("save");
    let buttonCancel = document.getElementById("cancel");
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
    //neccesary for navigation
    let selectionTypeID = 0; //which Element is to be selected? 0=Klinge 1=Griff 2=Knauf
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
    readElementsFromJSON("data.json");
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
            window.open("EndSelection.html");
        }
    }
    //#region Button Click Handler
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
        console.log("selection canceled!");
    }
})(Kapitelaufgabe2Script || (Kapitelaufgabe2Script = {}));
//# sourceMappingURL=script.js.map