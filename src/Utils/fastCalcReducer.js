import {
    selectPipe,
    calculateVelocity,
    calculateUnitPipePressureDrop,
    calculateVolumetricFlow,
    getMediumParameters
  } from "Utils/fluidMechanicsFormulas";
import seamPipes from "Data/pipes";
import water from "Data/water";

export const stateReducer = (state, action) => {
const {temperature} = state;
    let viscosityInCentipoise = getMediumParameters(
        water,
        temperature
      ).viscosity;
      let density = getMediumParameters(water, temperature).density;
      let dynamicViscosity = viscosityInCentipoise / 1000 / density;

    switch (action.type) {

        case "setStateToInitial": {
            return { ...action.payload };
        }
        case "setFlow": {
            const flow = action.flow > 1000 ? 1000 : action.flow;

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow, pipe: "", velocity: "", pressureDrop: "" };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);


            return { ...state, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }
        case "setCapacity": {
            const specificHeat = 4.19;
            const flow = (calculateVolumetricFlow(action.capacity, state.delta, density, specificHeat) * 3.6).toFixed(1);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: "", pressureDrop: "" };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);


            return { ...state, capacity: action.capacity, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }

        case "setDelta": {
            const specificHeat = 4.19;
            const delta = action.delta >= 50 ? 50 : action.delta;
            const flow = (calculateVolumetricFlow(state.capacity, delta, density, specificHeat) * 3.6).toFixed(1);

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: "", pressureDrop: "", delta };
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);


            return { ...state, delta, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }
        case "setPipe": {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                state.allowedVelocity
            );

            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop };
        }
        case "setAllowedPressureDrop": {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                dynamicViscosity,
                density,
                action.allowedPressureDrop,
                state.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", allowedPressureDrop: action.allowedPressureDrop };
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedPressureDrop: action.allowedPressureDrop, velocity, pressureDrop: unitPressureDrop };
        }
        case "setAllowedVelocity": {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                dynamicViscosity,
                density,
                state.allowedPressureDrop,
                action.allowedVelocity
            );
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", allowedVelocity: action.allowedVelocity };
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                density,
                velocity,
                dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedVelocity: action.allowedVelocity, velocity, pressureDrop: unitPressureDrop };
        }

        default: return { ...state };
    }
};