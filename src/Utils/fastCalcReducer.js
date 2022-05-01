import {
    selectPipe,
    calculateVelocity,
    calculateUnitPipePressureDrop,
    calculateVolumetricFlow,
    getMediumParameters,
    calculateDynamicViscosity
} from "Utils/fluidMechanicsFormulas";
import seamPipes from "Data/pipes";
import * as propyleneGlycol from "../Data/propyleneGlycol";
import * as ethyleneGlycol from "../Data/ethyleneGlycol";
import { water } from "../Data/water";

const media = { ...propyleneGlycol, ...ethyleneGlycol, water };

export const stateReducer = (state, action) => {

    switch (action.type) {

        case "initialCalc": {

            const { temperature, medium } = state;
            const mediumParameters = getMediumParameters(media[medium].parameters, temperature);
            const density = mediumParameters.density;
            const dynamicViscosity = calculateDynamicViscosity(mediumParameters.viscosity, density);
            const specificHeat = media[state.medium].parameters[temperature].specificHeat;
            const flow = calculateVolumetricFlow(state.capacity, state.delta, density, specificHeat);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );

            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, velocity: velocity, pressureDrop: unitPressureDrop, flow, density, dynamicViscosity, specificHeat };
        }

        case "setFlow": {
            const flow = action.flow > 1000 ? 1000 : action.flow;

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow, pipe: "", velocity: "", pressureDrop: "" };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }
        case "setCapacity": {
            const capacity = action.capacity > 10000 ? 10000 : action.capacity;
            const flow = calculateVolumetricFlow(capacity, state.delta, state.density, state.specificHeat);
            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: "", pressureDrop: "", capacity };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, capacity, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }

        case "setDelta": {
            const delta = action.delta >= 50 ? 50 : action.delta;
            const flow = calculateVolumetricFlow(state.capacity, delta, state.density, state.specificHeat);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: "", pressureDrop: "", delta };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
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
                action.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", allowedPressureDrop: action.allowedPressureDrop };
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedPressureDrop: action.allowedPressureDrop, velocity, pressureDrop: unitPressureDrop };
        }
        case "setAllowedVelocity": {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                state.dynamicViscosity,
                state.density,
                state.allowedPressureDrop,
                action.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", allowedVelocity: action.allowedVelocity };
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                state.density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedVelocity: action.allowedVelocity, velocity, pressureDrop: unitPressureDrop };
        }
        case "setMedium": {
            const temperature = media[action.medium].parameters[state.temperature] ? state.temperature : 20;
            let mediumParameters = getMediumParameters(media[action.medium].parameters, temperature);

            const specificHeat = mediumParameters.specificHeat;
            const density = mediumParameters.density;
            const flow = action.mode==="calc-2" ? state.flow : calculateVolumetricFlow(state.capacity, state.delta, density, specificHeat);

            let dynamicViscosity = calculateDynamicViscosity(mediumParameters.viscosity, density);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", medium: action.medium };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                state.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, flow, medium: action.medium, velocity, pressureDrop: unitPressureDrop, temperature };
        }

        case "setTemperature": {
            const temperature = action.temperature;
            let mediumParameters = getMediumParameters(media[state.medium].parameters, temperature);

            const specificHeat = mediumParameters.specificHeat;
            const density = mediumParameters.density;
            const flow = action.mode==="calc-2" ? state.flow : calculateVolumetricFlow(state.capacity, state.delta, density, specificHeat);

            let dynamicViscosity = calculateDynamicViscosity(mediumParameters.viscosity, density);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", medium: action.medium };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000);
            const unitPressureDrop = calculateUnitPipePressureDrop(
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