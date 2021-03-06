
export interface PipesObject {
        [key: string]: { externalDiameter: number, wallThickness: number, innerDiameter: number }
}

const seamPipes: PipesObject = {
    "15": { externalDiameter: 21.3, wallThickness: 2, innerDiameter: 17.3 },
    "20": { externalDiameter: 26.9, wallThickness: 2, innerDiameter: 22.9 },
    "25": { externalDiameter: 33.7, wallThickness: 2, innerDiameter: 29.7 },
    "32": { externalDiameter: 42.4, wallThickness: 2.3, innerDiameter: 37.8 },
    "40": { externalDiameter: 48.3, wallThickness: 2.3, innerDiameter: 43.7 },
    "50": { externalDiameter: 60.3, wallThickness: 2.3, innerDiameter: 55.7 },
    "65": { externalDiameter: 76.1, wallThickness: 2.6, innerDiameter: 70.9 },
    "80": { externalDiameter: 88.9, wallThickness: 2.9, innerDiameter: 83.1 },
    "100": { externalDiameter: 114.3, wallThickness: 3.2, innerDiameter: 107.9 },
    "125": { externalDiameter: 139.7, wallThickness: 3.6, innerDiameter: 132.5 },
    "150": { externalDiameter: 168.3, wallThickness: 4, innerDiameter: 160.3 },
    "200": { externalDiameter: 219.1, wallThickness: 4.5, innerDiameter: 210.1 },
    "250": { externalDiameter: 273., wallThickness: 5, innerDiameter: 263.0 },
    "300": { externalDiameter: 323.9, wallThickness: 5.6, innerDiameter: 312.7 },
    "350": { externalDiameter: 355.6, wallThickness: 5.6, innerDiameter: 344.4 },
    "400": { externalDiameter: 406.4, wallThickness: 6.3, innerDiameter: 393.8 },
    "450": { externalDiameter: 457, wallThickness: 6.3, innerDiameter: 444.4 }
};

const seamlessPipes: PipesObject = {
    "15": { externalDiameter: 21.3, wallThickness: 2, innerDiameter: 17.3 },
    "20": { externalDiameter: 26.9, wallThickness: 2.3, innerDiameter: 22.3 },
    "25": { externalDiameter: 33.7, wallThickness: 2.6, innerDiameter: 28.5 },
    "32": { externalDiameter: 42.4, wallThickness: 2.6, innerDiameter: 37.2 },
    "40": { externalDiameter: 48.3, wallThickness: 2.6, innerDiameter: 43.1 },
    "50": { externalDiameter: 60.3, wallThickness: 2.9, innerDiameter: 54.5 },
    "65": { externalDiameter: 76.1, wallThickness: 2.9, innerDiameter: 70.3 },
    "80": { externalDiameter: 88.9, wallThickness: 3.2, innerDiameter: 82.5 },
    "100": { externalDiameter: 114.3, wallThickness: 3.6, innerDiameter: 107.1 },
    "125": { externalDiameter: 139.7, wallThickness: 4, innerDiameter: 131.7 },
    "150": { externalDiameter: 168.3, wallThickness: 4.5, innerDiameter: 159.3 },
    "200": { externalDiameter: 219.1, wallThickness: 6.3, innerDiameter: 206.5},
    "250": { externalDiameter: 273., wallThickness: 6.3, innerDiameter: 260.4 },
    "300": { externalDiameter: 323.9, wallThickness: 7.1, innerDiameter: 309.7 },
    "350": { externalDiameter: 355.6, wallThickness: 8, innerDiameter: 339.6 },
    "400": { externalDiameter: 406.4, wallThickness: 8.8, innerDiameter: 386.8 },
    "450": { externalDiameter: 457, wallThickness: 10, innerDiameter: 437 }
};

export {seamPipes, seamlessPipes};