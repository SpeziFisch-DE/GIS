"use strict";
var Kapitelaufgabe2Script;
(function (Kapitelaufgabe2Script) {
    Kapitelaufgabe2Script.klinge = [];
    Kapitelaufgabe2Script.griff = [];
    Kapitelaufgabe2Script.knauf = [];
    function elementsToJSON() {
        let swordElements = { klinge: Kapitelaufgabe2Script.klinge, griff: Kapitelaufgabe2Script.griff, knauf: Kapitelaufgabe2Script.knauf };
        let json = JSON.stringify(swordElements);
        return json;
    }
})(Kapitelaufgabe2Script || (Kapitelaufgabe2Script = {}));
//# sourceMappingURL=data.js.map