function a6(): void {
    let x: string = "#";
    do {
        console.log(x);
        x = x + "#";
    } while (x.length < 8);
}

a6();