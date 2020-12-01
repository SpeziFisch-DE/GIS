namespace Kapitelaufgabe2Script {
    //finding HTML Elements
    let imageDiv: HTMLElement = document.getElementById("Selection");
    let buttonSave: HTMLElement = document.getElementById("save");
    let buttonCancel: HTMLElement = document.getElementById("cancel");
    //#region Button Click Handler
    buttonSave.addEventListener("click", handleClickSave);
    function handleClickSave(_event: Event): void {
        let imgs: HTMLCollection = document.getElementsByClassName("selected");
        let imgToSave: string = "nothing selected!";
        if (imgs.item(0) != null) {
            imgToSave = imgs.item(0).getAttribute("src");
        }
        console.log(imgToSave);
    }
    buttonCancel.addEventListener("click", handleClickCancel);
    function handleClickCancel(_event: Event): void {
        console.log("selection canceled!");
    }
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
            }
        }
    }

    function addElementAuswahl(sword: SwordElement): void {
        let imageElement: HTMLImageElement = document.createElement("img");
        imageElement.src = sword.link;
        imageElement.addEventListener("click", handleClickSetChoice);
        imageDiv.appendChild(imageElement);
    }
    //#endregion
    //#endregion

    let selectionTypeID: number = 0; //which Element is to be selected? 0=Klinge 1=Griff 2=Knauf

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


    addElementAuswahl(new SwordElement(0, "Media/Klingen/klinge1.png"));
    addElementAuswahl(new SwordElement(0, "Media/Klingen/klinge2.png"));
}