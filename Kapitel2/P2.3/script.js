"use strict";
var Kapitel2P3;
(function (Kapitel2P3) {
    //find body and head
    let body = document.body;
    //create Elements
    //create button for Rectangle
    let buttonNewRect = document.createElement("button");
    buttonNewRect.appendChild(document.createTextNode("Neues Rechteck"));
    body.appendChild(buttonNewRect);
    //create button for Reset
    let buttonReset = document.createElement("button");
    buttonReset.appendChild(document.createTextNode("Reset"));
    body.appendChild(buttonReset);
    //create RectSpace
    let rectSpace = document.createElement("div");
    rectSpace.setAttribute("style", "display: block");
    body.appendChild(rectSpace);
    //buttonClicks
    buttonNewRect.addEventListener("click", handleClickNewRect);
    function handleClickNewRect(_event) {
        drawRect(createRect());
    }
    buttonReset.addEventListener("click", handleClickReset);
    function handleClickReset(_event) {
        while (rectSpace.childElementCount > 0) {
            rectSpace.removeChild(rectSpace.firstChild);
        }
    }
    function createRect() {
        return { xPos: Math.random() * 300, yPos: Math.random() * 300, edgeA: Math.random() * 100 + 100, edgeB: Math.random() * 100 + 100 };
    }
    function drawRect(rekt) {
        let newRect = document.createElement("div");
        newRect.setAttribute("style", "position: absolute" + ";background-color: black" + ";height:" + rekt.edgeB + "px ;width:" + rekt.edgeA + "px ;margin: " + rekt.yPos + "px 0" + "px 0px " + rekt.xPos + "px");
        rectSpace.appendChild(newRect);
    }
})(Kapitel2P3 || (Kapitel2P3 = {}));
//# sourceMappingURL=script.js.map