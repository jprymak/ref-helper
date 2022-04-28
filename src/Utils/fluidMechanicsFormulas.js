
export function calculateVolumetricFlow(capacity, delta, density, specificHeat) {
    return (capacity / delta / density / specificHeat * 3600).toFixed(1); /* l/s */
}

export function calculateVelocity(volumetricFlow, innerDiameter) {
    return (volumetricFlow / (3.14 * (innerDiameter/2)**2)/3600).toFixed(2); /* m/s */
}

export function calculateRelativeRoughness(innerDiameter) {
    return 0.00018 / innerDiameter;
}

export function calculateReynoldsNumber(velocity, innerDiameter, viscosity) {
    return (velocity * innerDiameter) / viscosity;
}

export function calculatePipePressureDropFactor(reynoldsNumber, relativeRoughness) {
    return (1 / (-2 * Math.log10((6.1 / (reynoldsNumber**0.915)) + 0.268 * relativeRoughness)))**2;
}

export function calculateDynamicViscosity(viscosityInCentipoise, density){
return viscosityInCentipoise / 1000 / density;
}

export function calculateUnitPipePressureDrop(innerDiameter, density, velocity, viscosity) {

    const relativeRoughness = calculateRelativeRoughness(innerDiameter);
    const reynoldsNumber = calculateReynoldsNumber(velocity, innerDiameter, viscosity);
    const pipePressureDropFactor = calculatePipePressureDropFactor(reynoldsNumber, relativeRoughness);

    return pipePressureDropFactor / innerDiameter * ((density * (velocity**2)) / 2);  // 'Pa/m
}

export function calculateTotalPipePressureDrop(unitPressureDrop, pipeLength) {
    return unitPressureDrop * pipeLength;
}

export function getMediumParameters(medium, temperature){
    return medium[temperature];
}

export function selectPipe(seamPipes, flow, viscosity, density, allowedPressureDrop, allowedVelocity){
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


