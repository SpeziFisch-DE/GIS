"use strict";
var Kapitelaufgabe2Script;
(function (Kapitelaufgabe2Script) {
    //finding HTML Elements
    let imageDiv = document.getElementById("Selection");
    let buttonSave = document.getElementById("save");
    let buttonCancel = document.getElementById("cancel");
    //#region Button Click Handler
    buttonSave.addEventListener("click", handleClickSave);
    function handleClickSave(_event) {
        let imgs = document.getElementsByClassName("selected");
        let imgToSave = "nothing selected!";
        if (imgs.item(0) != null) {
            imgToSave = imgs.item(0).getAttribute("src");
        }
        console.log(imgToSave);
    }
    buttonCancel.addEventListener("click", handleClickCancel);
    function handleClickCancel(_event) {
        console.log("selection canceled!");
    }
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
    //#endregion
    //#endregion
    let selectionTypeID = 0; //which Element is to be selected? 0=Klinge 1=Griff 2=Knauf
    //DatenKlassen
    class SwordElement {
        constructor(_typeID, _link) {
            this.typeID = _typeID;
            this.link = _link;
        }
    }
    Kapitelaufgabe2Script.SwordElement = SwordElement;
    addElementAuswahl(new SwordElement(0, "Media/Klingen/klinge1.png"));
    addElementAuswahl(new SwordElement(0, "Media/Klingen/klinge2.png"));
})(Kapitelaufgabe2Script || (Kapitelaufgabe2Script = {}));
//# sourceMappingURL=script.js.map