namespace Kapitelaufgabe2Script {
    export let klinge: SwordElement[] = [];
    export let griff: SwordElement[] = [];
    export let knauf: SwordElement[] = [];

    function elementsToJSON(): string{
        let swordElements: EverySwordElement = {klinge: klinge, griff: griff, knauf: knauf};
        let json: string = JSON.stringify(swordElements);
        return json;
    }
}