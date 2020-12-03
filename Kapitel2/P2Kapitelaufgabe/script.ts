namespace Kapitelaufgabe2Script {
    //finding HTML Elements
    let imageDiv: HTMLElement = document.getElementById("Selection");
    let imageDivFinished: HTMLElement = document.getElementById("finished");
    let responseDiv: HTMLElement = document.getElementById("serverResponse");
    let buttonSave: HTMLElement = document.getElementById("save");
    let buttonCancel: HTMLElement = document.getElementById("cancel");
    let buttonNew: HTMLElement = document.getElementById("new");




    //neccesary for navigation
    let selectionTypeID: number = 0; //which Element is to be selected/displayed? 0=Klinge 1=Griff 2=Knauf




    //loading selected Elements aside  
    let imageKlinge: HTMLImageElement = document.createElement("img");
    let imageGriff: HTMLImageElement = document.createElement("img");
    let imageKnauf: HTMLImageElement = document.createElement("img");
    imageKlinge.src = "";
    imageGriff.src = "";
    imageKnauf.src = "";
    function loadingImagesTo(div: HTMLElement): void {
        imageKlinge.className = "end";
        imageGriff.className = "end";
        imageKnauf.className = "end";
        div.appendChild(imageKlinge);
        div.appendChild(imageGriff);
        div.appendChild(imageKnauf);
    }




    // Choosing Element
    function handleClickSetChoice(_event: Event): void {
        let images: HTMLCollection = imageDiv.children;
        for (let i: number = 0; i < images.length; i++) {
            if (images.item(i) == _event.target) { //finding Element to be selected
                let prevImg: HTMLCollection = document.getElementsByClassName("selected");
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
    export function addElementAuswahl(sword: SwordElement): void { // adding one Element to selection
        let imageElement: HTMLImageElement = document.createElement("img");
        imageElement.src = sword.link;
        imageElement.addEventListener("click", handleClickSetChoice);
        imageDiv.appendChild(imageElement);
    }

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
        typeID: number; //which type of element is this? 0=Klinge 1=Griff 2=Knauf
        link: string;
    }
    export interface EverySwordElement {
        klinge: SwordElement[];
        griff: SwordElement[];
        knauf: SwordElement[];
    }

   
    export function elementsFromJSONString(jsonString: string, requestedTypeID: number): void { // for adding all Elements of one type to selection from JSON string
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
    export async function readElementsFromJSON(_path: RequestInfo): Promise<void> { // for reading elements from JSON document
        let response: Response = await fetch(_path);
        let jsonString: string = await response.text();
        elementsFromJSONString(jsonString, selectionTypeID);
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") { // read first selection set
        loadingImagesTo(imageDivFinished);
        readElementsFromJSON("data.json");
    }

    function nextSelection(): void {
        if (selectionTypeID < 2) { //is still there still an item to be selected?
            selectionTypeID += 1;
            let images: HTMLCollection = imageDiv.children;
            console.log("to delete" + images.length);
            for (let i: number = images.length - 1; i >= 0; i--) { // deleting existing selection-set
                images.item(i).remove();
                console.log("deleted" + i);
            }
            readElementsFromJSON("data.json");
        } else {
            window.open("EndSelection.html", "_self");
        }
    }

    
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "Select.html") { //#region Button declaration for Selection page
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
    } //#endregion Button declaration for Selection page

    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "EndSelection.html") {

        buttonNew.addEventListener("click", handleClickNew); // Button declaration for Display page
        function handleClickNew(_event: Event): void {
            localStorage.clear();
            selectionTypeID = 0;
            window.open("Select.html", "_self");
        }

        
        loadingImagesTo(imageDivFinished); // reading local storage for Display
        imageKlinge.src = localStorage.getItem("klinge");
        imageGriff.src = localStorage.getItem("griff");
        imageKnauf.src = localStorage.getItem("knauf");


        //#region Sending Cache to Server
        interface Antwort {
            error: string;
            message: string;
        }
        async function sendCache(url: string): Promise<void> {
            let browserCacheData: JSON = JSON.parse(JSON.stringify(localStorage));
            let query: URLSearchParams = new URLSearchParams(<any>browserCacheData);
            url = url + "?" + query.toString();
            let response: Response = await fetch(url);
            let responseText: Antwort = await response.json();
            let responseDisplay: HTMLElement = document.createElement("p");
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


}