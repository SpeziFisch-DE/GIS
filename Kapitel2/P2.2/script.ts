namespace Kapitel2P2 {
    //Aufgabe 1 a
    function min(numbers: number[]): void {
        let minNum: number = numbers[0];
        for (let i: number = 0; i < numbers.length; i++) {
            if (numbers[i] < minNum) {
                minNum = numbers[i];
            }
        }
        console.log(minNum);
    }

    min([7, 4, 6, 3, 8, 5]);
    //Aufgabe 1 b
    function isEven(num: number): boolean {
        if (num < 0) {
            num = -num;
        }
        if (num == 0) {
            return true;
        } else if (num == 1) {
            return false;
        } else {
            return isEven(num - 2);
        }

    }

    console.log(isEven(-5));

    //Aufgabe 1 c
    interface Student {
        name: String;
        matrikelnummer: number;
        studiengang: string;
    }

    let student1: Student;
    let student2: Student;
    let student3: Student;
    student1.name = "Hans Peter";
    student2.name = "Max Mustermann";
    student3.name = "Petra Müller";
    student1.matrikelnummer = 123456;
    student2.matrikelnummer = 234567;
    student3.matrikelnummer = 345678;
    student1.studiengang = "MIB";
    student2.studiengang = "OMB";
    student3.studiengang = "MKB";
    let studierende: Student[] = [student1, student2, student3];
    studierende.push({ name: "Anna Lena", matrikelnummer: 456789, studiengang: "MM" });

    function showInfo(studierender: Student): void {
        console.log(studierender.name);
        console.log(studierender.matrikelnummer);
        console.log(studierender.studiengang);
    }

    showInfo(studierende[1]);
    showInfo(studierende[2]);
    showInfo(studierende[3]);
    showInfo(studierende[4]);



    //Aufgabe 2
    function backwards(_numbers: number[]): number[] {
        let backwards: number[];
        for (let i: number = 0; i < _numbers.length; i++) {
            backwards.push(_numbers[_numbers.length - i]);
        }
        return backwards;
    }

    backwards([3, 2, 1]);

    function join(_a1: number[], _a2: number[]): number[] {
        let joined: number[];
        for (let i: number = 0; i < _a1.length; i++) {
            joined.push(_a1[i]);
        }
        for (let i: number = 0; i < _a2.length; i++) {
            joined.push(_a2[i]);
        }
        return joined;
    }

    join([1, 2], [3, 4]);

    function split(_a: number[], _i1: number, _i2: number): number[] {
        let splitted: number[];
        if ((_i1 > _i2) && (_i1 > 0) && (_i2 > 0)) {
            let save: number = _i1;
            _i1 = _i2;
            _i2 = save;
        }
        if (_i2 < _a.length) {
            for (let i: number = _i1; i <= _i2; i++) {
                splitted.push(_a[i]);
            }
        }
        return splitted;
    }

    split([1, 2, 3, 4, 5, 6], 0, 4);


    //Aufgabe 3 a
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myFirstCanvas");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");

}