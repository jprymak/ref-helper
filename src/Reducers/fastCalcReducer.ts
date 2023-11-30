import {
  calculateVolumetricFlow,
  getMediumParameters,
  calculateDynamicViscosity,
} from "Utils/fluidMechanicsFormulas";

import * as fluids from "../Data/fluids";
import { IFluidsLibrary } from "../Data/fluids";

const media: IFluidsLibrary = { ...fluids };

export type FastCalcAction =
  | { type: "initialCalc" }
  | { type: "setCapacity"; payload: string }
  | { type: "setDelta"; payload: string }
  | { type: "setFlow"; payload: string }
  | { type: "setMedium"; payload: string; mode: string }
  | { type: "setTemperature"; payload: number; mode: string }
  | { type: "setPipeType"; payload: string };


  interface Error{
   message: string
  }


export interface ErrorsObject{
  capacity?: Error
  flow?: Error
  delta?: Error;
}

export interface FastCalcState{
  capacity: number;
  temperature: number;
  flow: number;
  delta: number;
  medium: string;
  dynamicViscosity: number;
  density: number;
  specificHeat: number;
  pipeType: string;
  errors: ErrorsObject
}

const validate = (state: FastCalcState) =>{
  const errors: ErrorsObject = {}
if(state.capacity<=0 || !state.capacity){
  errors.capacity = {message: "capacityErrorMessage"}
}
if(state.flow<=0 || !state.flow){
  errors.flow = {message: "flowErrorMessage"}
}
if(state.delta<=0 || !state.delta){
  errors.delta = {message: "deltaErrorMessage"}
}
return {...state, errors}
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
      )

      return validate({ ...state, flow, density, dynamicViscosity, specificHeat });
    }

    case "setFlow": {
      const flow = +action.payload > 1000 ? 1000 : +action.payload;
      return validate({ ...state, flow })
    }
    case "setCapacity": {
      const capacity = +action.payload > 10000 ? 10000 : +action.payload;
      const flow = calculateVolumetricFlow(
        capacity,
        state.delta,
        state.density,
        state.specificHeat
      );

      return validate({ ...state, capacity, flow })
    }

    case "setDelta": {
      const delta = +action.payload >= 50 ? 50 : +action.payload;
      const flow = calculateVolumetricFlow(
        state.capacity,
        delta,
        state.density,
        state.specificHeat
      )

      return validate({ ...state, delta, flow })
    }

    case "setPipeType": {
      return { ...state, pipeType: action.payload };
    }

    case "setMedium": {
      const temperature = media[action.payload].parameters[state.temperature]
        ? state.temperature
        : 20;

      const mediumParameters = getMediumParameters(
        media[action.payload].parameters,
        temperature
      );

      const specificHeat = mediumParameters.specificHeat;
      const density = mediumParameters.density;
      const flow =
        action.mode === ""
          ? state.flow
          : calculateVolumetricFlow(
              state.capacity,
              state.delta,
              density,
              specificHeat
            )

      const dynamicViscosity = calculateDynamicViscosity(
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
      const mediumParameters = getMediumParameters(
        media[state.medium].parameters,
        temperature
      );

      const specificHeat = mediumParameters.specificHeat;
      const density = mediumParameters.density;
      const flow =
        action.mode === ""
          ? state.flow
          : calculateVolumetricFlow(
              state.capacity,
              state.delta,
              density,
              specificHeat
            )

      const dynamicViscosity = calculateDynamicViscosity(
        mediumParameters.viscosity,
        density
      );

      return { ...state, flow, temperature, dynamicViscosity };
    }

    default:
      return { ...state };
  }
};
