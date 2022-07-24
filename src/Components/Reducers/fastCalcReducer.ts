import {
  calculateVolumetricFlow,
  getMediumParameters,
  calculateDynamicViscosity,
} from "Utils/fluidMechanicsFormulas";

import * as fluids from "../../Data/fluids";
import { FluidType } from "../../Data/fluids";

interface IFluidsLibrary {
  [key: string]: FluidType;
}

const media: IFluidsLibrary = { ...fluids };

export type FastCalcAction =
  | { type: "initialCalc" }
  | { type: "setCapacity"; payload: string }
  | { type: "setDelta"; payload: string }
  | { type: "setFlow"; payload: string }
  | { type: "setMedium"; payload: string; mode: string }
  | { type: "setTemperature"; payload: string; mode: string }
  | { type: "setPipeType"; payload: string };

export interface FastCalcState {
  [key: string]: string | number;
  capacity: string;
  temperature: string;
  flow: string;
  delta: string;
  medium: string;
  dynamicViscosity: number;
  density: number;
  specificHeat: number;
  pipeType: string;
}

export const stateReducer = (
  state: FastCalcState,
  action: FastCalcAction
): FastCalcState => {
  switch (action.type) {
    case "initialCalc": {
      const { temperature, medium } = state;
      const mediumParameters = getMediumParameters(
        media[medium].parameters,
        temperature
      );
      const density = mediumParameters.density;
      const dynamicViscosity = calculateDynamicViscosity(
        mediumParameters.viscosity,
        density
      );
      const specificHeat =
        media[state.medium].parameters[temperature].specificHeat;
      const flow = calculateVolumetricFlow(
        state.capacity,
        state.delta,
        density,
        specificHeat
      ).toString();

      return { ...state, flow, density, dynamicViscosity, specificHeat };
    }

    case "setFlow": {
      const flow = Number(action.payload) > 1000 ? "1000" : action.payload;

      return { ...state, flow };
    }
    case "setCapacity": {
      const capacity = +action.payload > 10000 ? "10000" : action.payload;
      const flow = calculateVolumetricFlow(
        capacity,
        state.delta,
        state.density,
        state.specificHeat
      ).toString();

      return { ...state, capacity, flow };
    }

    case "setDelta": {
      const delta = +action.payload >= 50 ? "50" : action.payload;
      const flow = calculateVolumetricFlow(
        state.capacity,
        delta,
        state.density,
        state.specificHeat
      ).toString();

      return { ...state, delta, flow };
    }

    case "setPipeType": {
      return { ...state, pipeType: action.payload };
    }

    case "setMedium": {
      const temperature = media[action.payload].parameters[state.temperature]
        ? state.temperature
        : "20";

      let mediumParameters = getMediumParameters(
        media[action.payload].parameters,
        temperature
      );

      const specificHeat = mediumParameters.specificHeat;
      const density = mediumParameters.density;
      const flow =
        action.mode === "calc-2"
          ? state.flow
          : calculateVolumetricFlow(
              state.capacity,
              state.delta,
              density,
              specificHeat
            ).toString();

      let dynamicViscosity = calculateDynamicViscosity(
        mediumParameters.viscosity,
        density
      );

      return {
        ...state,
        flow,
        medium: action.payload,
        temperature,
        dynamicViscosity,
      };
    }

    case "setTemperature": {
      const temperature = action.payload;
      let mediumParameters = getMediumParameters(
        media[state.medium].parameters,
        temperature
      );

      const specificHeat = mediumParameters.specificHeat;
      const density = mediumParameters.density;
      const flow =
        action.mode === "calc-2"
          ? state.flow
          : calculateVolumetricFlow(
              state.capacity,
              state.delta,
              density,
              specificHeat
            ).toString();

      let dynamicViscosity = calculateDynamicViscosity(
        mediumParameters.viscosity,
        density
      );

      return { ...state, flow, temperature, dynamicViscosity };
    }

    default:
      return { ...state };
  }
};
