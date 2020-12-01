namespace Kapitel2P3 {
    //find body and head
    let body: HTMLElement = document.body;
    //create Elements
    //create button for Rectangle
    let buttonNewRect: HTMLButtonElement = document.createElement("button");
    buttonNewRect.appendChild(document.createTextNode("Neues Rechteck"));
    body.appendChild(buttonNewRect);
    //create button for Reset
    let buttonReset: HTMLButtonElement = document.createElement("button");
    buttonReset.appendChild(document.createTextNode("Reset"));
    body.appendChild(buttonReset);
    //create RectSpace
    let rectSpace: HTMLDivElement = document.createElement("div");
    rectSpace.setAttribute("style", "display: block");
    body.appendChild(rectSpace);

    //buttonClicks
    buttonNewRect.addEventListener("click", handleClickNewRect);
    function handleClickNewRect(_event: Event): void {
        drawRect(createRect());
    }
    buttonReset.addEventListener("click", handleClickReset);
    function handleClickReset(_event: Event): void {
        while (rectSpace.childElementCount > 0) {
        rectSpace.removeChild(rectSpace.firstChild);
        }
    }

    interface Rechteck {
        xPos: number;
        yPos: number;
        edgeA: number;
        edgeB: number;
    }

    function createRect(): Rechteck {
        return { xPos: Math.random() * 300, yPos: Math.random() * 300, edgeA: Math.random() * 100 + 100, edgeB: Math.random() * 100 + 100 };
    }

    function drawRect(rekt: Rechteck): void {
        let newRect: HTMLDivElement = document.createElement("div");
        newRect.setAttribute("style", "position: absolute" + ";background-color: black" + ";height:" + rekt.edgeB + "px ;width:" + rekt.edgeA + "px ;margin: " + rekt.yPos + "px 0" + "px 0px " + rekt.xPos + "px")
        rectSpace.appendChild(newRect);
    }

    


}