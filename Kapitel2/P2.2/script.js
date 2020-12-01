"use strict";
var Kapitel2P2;
(function (Kapitel2P2) {
    //Aufgabe 1 a
    function min(numbers) {
        let minNum = numbers[0];
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] < minNum) {
                minNum = numbers[i];
            }
        }
        console.log(minNum);
    }
    min([7, 4, 6, 3, 8, 5]);
    //Aufgabe 1 b
    function isEven(num) {
        if (num < 0) {
            num = -num;
        }
        if (num == 0) {
            return true;
        }
        else if (num == 1) {
            return false;
        }
        else {
            return isEven(num - 2);
        }
    }
    console.log(isEven(-5));
    let student1 = { name: "Anna Lena", matrikelnummer: 456789, studiengang: "MM" };
    let student2 = { name: "Anna Lena", matrikelnummer: 456789, studiengang: "MM" };
    let student3 = { name: "Anna Lena", matrikelnummer: 456789, studiengang: "MM" };
    student1.name = "Hans Peter";
    student2.name = "Max Mustermann";
    student3.name = "Petra Müller";
    student1.matrikelnummer = 123456;
    student2.matrikelnummer = 234567;
    student3.matrikelnummer = 345678;
    student1.studiengang = "MIB";
    student2.studiengang = "OMB";
    student3.studiengang = "MKB";
    let studierende = [student1, student2, student3];
    studierende.push({ name: "Anna Lena", matrikelnummer: 456789, studiengang: "MM" });
    function showInfo(studierender) {
        console.log(studierender.name);
        console.log(studierender.matrikelnummer);
        console.log(studierender.studiengang);
    }
    showInfo(studierende[0]);
    showInfo(studierende[1]);
    showInfo(studierende[2]);
    showInfo(studierende[3]);
    //Aufgabe 2
    function backwards(_numbers) {
        let backwards = [];
        for (let i = _numbers.length - 1; i >= 0; i--) {
            backwards.push(_numbers[i]);
        }
        return backwards;
    }
    console.log(backwards([3, 2, 1]));
    function join(_a1, _a2) {
        let joined = [];
        for (let i = 0; i < _a1.length; i++) {
            joined.push(_a1[i]);
        }
        for (let i = 0; i < _a2.length; i++) {
            joined.push(_a2[i]);
        }
        return joined;
    }
    console.log(join([1, 2], [3, 4]));
    function split(_a, _i1, _i2) {
        let splitted = [];
        if ((_i1 > _i2) && (_i1 > 0) && (_i2 > 0)) {
            let save = _i1;
            _i1 = _i2;
            _i2 = save;
        }
        if (_i2 < _a.length) {
            for (let i = _i1; i <= _i2; i++) {
                splitted.push(_a[i]);
            }
        }
        return splitted;
    }
    console.log(split([1, 2, 3, 4, 5, 6], 0, 4));
    //Aufgabe 3 a
    let canvas = document.getElementById("myFirstCanvas");
    let context = canvas.getContext("2d");
    context.lineWidth = 10;
    context.beginPath();
    context.rect(10, 10, 200, 200);
    context.fillRect(100, 100, 200, 200);
    context.moveTo(900, 900);
    context.bezierCurveTo(5, 3, 2, 3, 800, 200);
    context.closePath();
    context.stroke();
})(Kapitel2P2 || (Kapitel2P2 = {}));
//# sourceMappingURL=script.js.map