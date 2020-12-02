namespace Kapitelaufgabe2Script {
    //finding HTML Elements
    let imageDiv: HTMLElement = document.getElementById("Selection");
    let imageDivFinished: HTMLElement = document.getElementById("finished");
    let buttonSave: HTMLElement = document.getElementById("save");
    let buttonCancel: HTMLElement = document.getElementById("cancel");
    let buttonNew: HTMLElement = document.getElementById("new");


    //neccesary for navigation
    let selectionTypeID: number = 0; //which Element is to be selected? 0=Klinge 1=Griff 2=Knauf


    //loading selected Elements aside        
    let imageKlinge: HTMLImageElement = document.createElement("img");
    let imageGriff: HTMLImageElement = document.createElement("img");
    let imageKnauf: HTMLImageElement = document.createElement("img");
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
    function handleClickSetChoice(_event: Event): void {
        let images: HTMLCollection = imageDiv.children;
        for (let i: number = 0; i < images.length; i++) {
            if (images.item(i) == _event.target) { //finding Element to be selected
                let prevImg: HTMLCollection = document.getElementsByClassName("selected");
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

    export function addElementAuswahl(sword: SwordElement): void {
        let imageElement: HTMLImageElement = document.createElement("img");
        imageElement.src = sword.link;
        imageElement.addEventListener("click", handleClickSetChoice);
        imageDiv.appendChild(imageElement);
    }
    //#endregion
    //#endregion

    //DatenKlassen
    export class SwordElement {
        typeID: number; //which type of element is this? 0=Klinge 1=Griff 2=Knauf
        link: string;

        constructor(_typeID: number, _link: string) {
            this.typeID = _typeID;
            this.link = _link;
        }
    }

    export interface SwordElementInterface {
        typeID: number;
        link: string;
    }

    export interface MySword {
        klinge: SwordElement;
        griff: SwordElement;
        knauf: SwordElement;
    }

    export interface EverySwordElement {
        klinge: SwordElement[];
        griff: SwordElement[];
        knauf: SwordElement[];
    }

    export interface EverySwordElementInterface {
        klinge: SwordElementInterface[];
        griff: SwordElementInterface[];
        knauf: SwordElementInterface[];
    }



    export function elementsFromJSON(jsonString: string, requestedTypeID: number): void {
        let arrayFromJASON: EverySwordElement = JSON.parse(jsonString);
        Object.keys(arrayFromJASON).forEach(key => {
            if (key == "klinge" || key == "griff" || key == "knauf") {
                let elementsFromJSON: SwordElementInterface[] = arrayFromJASON[key];
                elementsFromJSON.forEach(element => {
                    if (element.typeID == requestedTypeID) {
                        addElementAuswahl(new SwordElement(element.typeID, element.link));
                    }
                });
            }
        });
    }

    export async function readElementsFromJSON(_path: RequestInfo): Promise<void> {
        let response: Response = await fetch(_path);
        let jsonString: string = await response.text();
        elementsFromJSON(jsonString, selectionTypeID);
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") {
        readElementsFromJSON("data.json");
    }

    function nextSelection(): void {
        if (selectionTypeID < 2) {
            selectionTypeID += 1;
            let images: HTMLCollection = imageDiv.children;
            console.log("to delete" + images.length);
            for (let i: number = images.length - 1; i >= 0; i--) {
                images.item(i).remove();
                console.log("deleted" + i);
            }
            readElementsFromJSON("data.json");
        } else {
            window.open("EndSelection.html", "_self");
        }
    }

    //#region Button Click Handler
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") {
        buttonSave.addEventListener("click", handleClickSave);
        function handleClickSave(_event: Event): void {
            let imgs: HTMLCollection = document.getElementsByClassName("selected");
            let imgToSave: string = "nothing selected!";
            if (imgs.item(0) != null) {
                imgToSave = imgs.item(0).getAttribute("src");
            }
            if (selectionTypeID == 0) {
                localStorage.setItem("klinge", imgToSave);
                console.log("saved!");
                nextSelection();
            } else if (selectionTypeID == 1) {
                localStorage.setItem("griff", imgToSave);
                console.log("saved!");
                nextSelection();
            } else if (selectionTypeID == 2) {
                localStorage.setItem("knauf", imgToSave);
                console.log("saved!");
                nextSelection();
            } else {
                console.log("Error: Selection could not be saved.");
            }
            console.log(imgToSave);

        }
        buttonCancel.addEventListener("click", handleClickCancel);
        function handleClickCancel(_event: Event): void {
            localStorage.clear();
            selectionTypeID = 0;
            let images: HTMLCollection = imageDiv.children;
            console.log("to delete" + images.length);
            for (let i: number = images.length - 1; i >= 0; i--) {
                images.item(i).remove();
                console.log("deleted" + i);
            }
            readElementsFromJSON("data.json");
            console.log("selection canceled!");
        }

    }

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "EndSelection.html") {
        buttonNew.addEventListener("click", handleClickNew);
        function handleClickNew(_event: Event): void {
            localStorage.clear();
            selectionTypeID = 0;
            window.open("Select.html", "_self");
        }

        //reading local storage
        let imageKlinge: HTMLImageElement = document.createElement("img");
        let imageGriff: HTMLImageElement = document.createElement("img");
        let imageKnauf: HTMLImageElement = document.createElement("img");
        imageKlinge.src = localStorage.getItem("klinge");
        imageGriff.src = localStorage.getItem("griff");
        imageKnauf.src = localStorage.getItem("knauf");
        imageKlinge.className = "end";
        imageGriff.className = "end";
        imageKnauf.className = "end";
        imageDivFinished.appendChild(imageKlinge);
        imageDivFinished.appendChild(imageGriff);
        imageDivFinished.appendChild(imageKnauf);
    }




}