import { PipesObject } from "Data/pipes";

import {FluidParameters} from "Data/fluids";



export function calculateVolumetricFlow(capacity: number, delta:number, density:number, specificHeat:number):number {
    return +(capacity / delta / density / specificHeat * 3600).toFixed(2); /* l/s */
}

export function calculateVelocity(volumetricFlow:number, innerDiameter:number) : number {
    return +(volumetricFlow / (3.14 * (innerDiameter/2)**2)/3600).toFixed(2); /* m/s */
}

export function calculateRelativeRoughness(innerDiameter:number):number {
    return 0.00018 / innerDiameter;
}

export function calculateReynoldsNumber(velocity:number, innerDiameter:number, viscosity:number):number {
    return (velocity * innerDiameter) / viscosity;
}

export function calculatePipePressureDropFactor(reynoldsNumber:number, relativeRoughness:number):number {
    return (1 / (-2 * Math.log10((6.1 / (reynoldsNumber**0.915)) + 0.268 * relativeRoughness)))**2;
}

export function calculateDynamicViscosity(viscosityInCentipoise:number, density:number){
return viscosityInCentipoise / 1000 / density;
}

export function calculateUnitPipePressureDrop(innerDiameter:number, density:number, velocity:number, viscosity:number): number {

    const relativeRoughness = calculateRelativeRoughness(innerDiameter);
    const reynoldsNumber = calculateReynoldsNumber(velocity, innerDiameter, viscosity);
    const pipePressureDropFactor = calculatePipePressureDropFactor(reynoldsNumber, relativeRoughness);

    return pipePressureDropFactor / innerDiameter * ((density * (velocity**2)) / 2);  // 'Pa/m
}

export function calculateTotalPipePressureDrop(unitPressureDrop:number, pipeLength:number) {
    return unitPressureDrop * pipeLength;
}

export function getMediumParameters(medium:any, temperature: string): FluidParameters{
    return medium[temperature];
}

export function selectPipe(seamPipes: PipesObject, flow:number, viscosity:number, density:number, allowedPressureDrop:number, allowedVelocity:number) : undefined | string{
    for(const pipe of Object.keys(seamPipes)){
        const innerDiameterInMeters = seamPipes[pipe].innerDiameter/1000;
        const velocityInMetersPerSeconds = calculateVelocity(flow, innerDiameterInMeters);
        const unitPressureDrop = calculateUnitPipePressureDrop(innerDiameterInMeters, density, velocityInMetersPerSeconds, viscosity);
        if( unitPressureDrop<allowedPressureDrop && velocityInMetersPerSeconds<allowedVelocity){
            return pipe;
        }
        else continue;
    }
}


