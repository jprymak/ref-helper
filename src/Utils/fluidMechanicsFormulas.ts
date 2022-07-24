import { PipesObject } from "Data/pipes";

import { FluidParameters } from "Data/fluids";

export function calculateVolumetricFlow(
  capacity: string,
  delta: string,
  density: number,
  specificHeat: number
): number {
  return +((+capacity / +delta / density / specificHeat) * 3600).toFixed(
    2
  ); /* l/s */
}

export function calculateVelocity(
  volumetricFlow: string,
  innerDiameter: number
): number {
  return +(+volumetricFlow / (3.14 * (innerDiameter / 2) ** 2) / 3600).toFixed(
    2
  ); /* m/s */
}

export function calculateRelativeRoughness(innerDiameter: number): number {
  return 0.00018 / innerDiameter;
}

export function calculateReynoldsNumber(
  velocity: number,
  innerDiameter: number,
  viscosity: number
): number {
  return (velocity * innerDiameter) / viscosity;
}

export function calculatePipePressureDropFactor(
  reynoldsNumber: number,
  relativeRoughness: number
): number {
  return (
    (1 /
      (-2 *
        Math.log10(
          6.1 / reynoldsNumber ** 0.915 + 0.268 * relativeRoughness
        ))) **
    2
  );
}

export function calculateDynamicViscosity(
  viscosityInCentipoise: number,
  density: number
) {
  return viscosityInCentipoise / 1000 / density;
}

export function calculateUnitPipePressureDrop(
  innerDiameter: number,
  density: number,
  velocity: number,
  viscosity: number
): number {
  const relativeRoughness = calculateRelativeRoughness(innerDiameter);
  const reynoldsNumber = calculateReynoldsNumber(
    velocity,
    innerDiameter,
    viscosity
  );
  const pipePressureDropFactor = calculatePipePressureDropFactor(
    reynoldsNumber,
    relativeRoughness
  );

  return (
    (pipePressureDropFactor / innerDiameter) * ((density * velocity ** 2) / 2)
  ); // 'Pa/m
}

export function calculateTotalPipePressureDrop(
  unitPressureDrop: number,
  pipeLength: number
) {
  return unitPressureDrop * pipeLength;
}

export function getMediumParameters(
  medium: any,
  temperature: string
): FluidParameters {
  return medium[temperature];
}

export function selectPipe(
  seamPipes: PipesObject,
  flow: string,
  viscosity: number,
  density: number,
  allowedPressureDrop: number,
  allowedVelocity: number
): undefined | string {
  for (const pipe of Object.keys(seamPipes)) {
    const innerDiameterInMeters = seamPipes[pipe].innerDiameter / 1000;
    const velocityInMetersPerSeconds = calculateVelocity(
      flow,
      innerDiameterInMeters
    );
    const unitPressureDrop = calculateUnitPipePressureDrop(
      innerDiameterInMeters,
      density,
      velocityInMetersPerSeconds,
      viscosity
    );
    if (
      unitPressureDrop < allowedPressureDrop &&
      velocityInMetersPerSeconds < allowedVelocity
    ) {
      return pipe;
    } else continue;
  }
}

export function generatePipeResults(
  seamPipes: PipesObject,
  flow: string,
  viscosity: number,
  density: number
): any {
  const results = [];

  for (const pipe of Object.keys(seamPipes)) {
    const innerDiameterInMeters = seamPipes[pipe].innerDiameter / 1000;
    const velocityInMetersPerSeconds = calculateVelocity(
      flow,
      innerDiameterInMeters
    );
    const unitPressureDrop = +calculateUnitPipePressureDrop(
      innerDiameterInMeters,
      density,
      velocityInMetersPerSeconds,
      viscosity
    ).toFixed(0);

    function giveOpinionOnPipeSelection(
      pipe: string,
      unitPressureDrop: number,
      velocityInMetersPerSeconds: number
    ): string {
      if (+pipe < 80) {
        if (unitPressureDrop >= 120 && unitPressureDrop <= 340) {
          return "recommended";
        } else if (unitPressureDrop > 600 || velocityInMetersPerSeconds > 2) {
          return "warning";
        } else if (unitPressureDrop < 120 || velocityInMetersPerSeconds < 0.5) {
          return "discouraged";
        } else return "none";
      }
      if (+pipe >= 80) {
        if (
          unitPressureDrop >= 120 &&
          unitPressureDrop <= 300 &&
          velocityInMetersPerSeconds < 2.5
        ) {
          return "recommended";
        } else if (
          velocityInMetersPerSeconds >= 2.5 ||
          unitPressureDrop > 600
        ) {
          return "warning";
        } else if (unitPressureDrop < 70 || velocityInMetersPerSeconds < 1) {
          return "discouraged";
        } else return "none";
      }

      return "none";
    }
    const opinion = giveOpinionOnPipeSelection(
      pipe,
      unitPressureDrop,
      velocityInMetersPerSeconds
    );
    const obj = {
      pipe,
      velocity: velocityInMetersPerSeconds,
      unitPressureDrop,
      opinion,
    };

    results.push(obj);
  }
  const recommendedCheck = results.find((el) => el.opinion === "recommended");

  if (!recommendedCheck) {
    for(let i=0; i<results.length; i++){
      if(results[i].unitPressureDrop<200 && results[i].opinion!=="recommended"){
        results[i].opinion = "recommended";
        break;
      }
    }

  }
  return results;
}
