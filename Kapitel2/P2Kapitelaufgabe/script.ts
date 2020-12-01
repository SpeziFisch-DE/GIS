namespace Kapitelaufgabe2Script {

    //DatenKlassen
    export class SwordElement {
        typeID: number;
        link: string;
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
}