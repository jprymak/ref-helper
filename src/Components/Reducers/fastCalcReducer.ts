import {
    selectPipe,
    calculateVelocity,
    calculateUnitPipePressureDrop,
    calculateVolumetricFlow,
    getMediumParameters,
    calculateDynamicViscosity,
} from "Utils/fluidMechanicsFormulas";
import seamPipes from "Data/pipes";

import * as fluids from "../../Data/fluids";
import {FluidType} from "../../Data/fluids";

interface IFluidsLibrary {
    [key: string]: FluidType
}

const media:IFluidsLibrary = {...fluids};

export type FastCalcAction = {type: "initialCalc"} |
    {type: "setCapacity", payload: string} |
    {type: "setDelta", payload: string} |
    {type: "setFlow", payload: string} |
    {type: "setAllowedVelocity", payload: number} |
    {type: "setAllowedPressureDrop", payload: number} |
    {type: "setMedium", payload: string, mode: string} |
    {type: "setTemperature", payload: string, mode: string}



export interface FastCalcState {
    [key: string]: string | number;
    capacity: string,
    temperature: string,
    flow: string,
    velocity: number,
    pressureDrop: number,
    allowedPressureDrop: number,
    allowedVelocity: number,
    pipe: string,
    delta: string,
    medium: string,
    dynamicViscosity: number,
    density: number,
    specificHeat: number,
}

export const stateReducer = (state: FastCalcState, action: FastCalcAction):FastCalcState => {

    switch (action.type) {

        case "initialCalc": {

            const { temperature, medium } = state;
            const mediumParameters = getMediumParameters(media[medium].parameters, temperature);
            const density = mediumParameters.density;
            const dynamicViscosity = calculateDynamicViscosity(mediumParameters.viscosity, density);
            const specificHeat = media[state.medium].parameters[temperature].specificHeat;
            const flow = calculateVolumetricFlow(state.capacity, state.delta, density, specificHeat).toString();

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: 0, pressureDrop: 0 };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, velocity: velocity, pressureDrop: unitPressureDrop, flow, density, dynamicViscosity, specificHeat };
        }

        case "setFlow": {
            const flow = Number(action.payload) > 1000 ? "1000" : action.payload;

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow, pipe: "", velocity: 0, pressureDrop: 0 };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }
        case "setCapacity": {
            const capacity = +action.payload > 10000 ? "10000" : action.payload;
            const flow = calculateVolumetricFlow(capacity, state.delta, state.density, state.specificHeat).toString();
            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "0", pipe: "", velocity: 0, pressureDrop: 0, capacity };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, capacity, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }

        case "setDelta": {
            const delta = +action.payload >= 50 ? "50" : action.payload;
            const flow = calculateVolumetricFlow(state.capacity, delta, state.density, state.specificHeat).toString();;

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "0", pipe: "", velocity: 0, pressureDrop: 0, delta };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);


            return { ...state, delta, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }

        case "setAllowedPressureDrop": {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                state.dynamicViscosity,
                state.density,
                action.payload,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: 0, pressureDrop: 0, allowedPressureDrop: action.payload };
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedPressureDrop: action.payload, velocity, pressureDrop: unitPressureDrop };
        }
        case "setAllowedVelocity": {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                action.payload
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: 0, pressureDrop: 0, allowedVelocity: action.payload };
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedVelocity: action.payload, velocity, pressureDrop: unitPressureDrop };
        }
        case "setMedium": {

            const temperature = media[action.payload].parameters[state.temperature] ? state.temperature : "20";

            let mediumParameters = getMediumParameters(media[action.payload].parameters, temperature);

            const specificHeat = mediumParameters.specificHeat;
            const density = mediumParameters.density;
            const flow = action.mode === "calc-2" ? state.flow : calculateVolumetricFlow(state.capacity, state.delta, density, specificHeat).toString();;

            let dynamicViscosity = calculateDynamicViscosity(mediumParameters.viscosity, density);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: 0, pressureDrop: 0, medium: action.payload };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, flow, medium: action.payload, velocity, pressureDrop: unitPressureDrop, temperature };
        }

        case "setTemperature": {
            const temperature = action.payload;
            let mediumParameters = getMediumParameters(media[state.medium].parameters, temperature);

            const specificHeat = mediumParameters.specificHeat;
            const density = mediumParameters.density;
            const flow = action.mode === "calc-2" ? state.flow : calculateVolumetricFlow(state.capacity, state.delta, density, specificHeat).toString();;

            let dynamicViscosity = calculateDynamicViscosity(mediumParameters.viscosity, density);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: 0, pressureDrop: 0 };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = +calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, flow, velocity, pressureDrop: unitPressureDrop, temperature };
        }

        default: return { ...state };
    }
};