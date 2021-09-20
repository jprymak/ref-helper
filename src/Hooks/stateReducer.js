import {
    selectPipe,
    calculateVelocity,
    calculateUnitPipePressureDrop,
    calculateVolumetricFlow
  } from "../Helpers/index.js";
import seamPipes from "../Data/pipes";

export const stateReducer = (state, action) => {
    switch (action.type) {
        case 'setFlow': {
            const flow = action.flow > 1000 ? 1000 : action.flow;

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                action.dynamicViscosity,
                action.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            )
            if (selectedPipe === undefined) return { ...state, flow, pipe: "", velocity: "", pressureDrop: "" }
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                action.density,
                velocity,
                action.dynamicViscosity
            ).toFixed(0);


            return { ...state, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop }
        }

        case 'setCapacity': {
            const specificHeat = 4.19;
            const flow = (calculateVolumetricFlow(action.capacity, state.delta, action.density, specificHeat) * 3.6).toFixed(1)

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                action.dynamicViscosity,
                action.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            )
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: "", pressureDrop: "" }
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                action.density,
                velocity,
                action.dynamicViscosity
            ).toFixed(0);


            return { ...state, capacity: action.capacity, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop }
        }

        case 'setDelta': {
            const specificHeat = 4.19;
            const flow = (calculateVolumetricFlow(state.capacity, action.delta, action.density, specificHeat) * 3.6).toFixed(1)

            const selectedPipe = selectPipe(
                seamPipes,
                flow,
                action.dynamicViscosity,
                action.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            )
            if (selectedPipe === undefined) return { ...state, flow: "", pipe: "", velocity: "", pressureDrop: "" }
            const velocity = calculateVelocity(flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                action.density,
                velocity,
                action.dynamicViscosity
            ).toFixed(0);


            return { ...state, delta: action.delta, flow, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop }
        }
        case 'setPipe': {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                action.dynamicViscosity,
                action.density,
                state.allowedPressureDrop,
                state.allowedVelocity
            )

            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                action.density,
                velocity,
                action.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, velocity, pressureDrop: unitPressureDrop }
        }
        case 'setAllowedPressureDrop': {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                action.dynamicViscosity,
                action.density,
                action.allowedPressureDrop,
                state.allowedVelocity
            )
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", allowedPressureDrop: action.allowedPressureDrop }
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                action.density,
                velocity,
                action.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedPressureDrop: action.allowedPressureDrop, velocity, pressureDrop: unitPressureDrop }
        }
        case 'setAllowedVelocity': {

            const selectedPipe = selectPipe(
                seamPipes,
                state.flow,
                action.dynamicViscosity,
                action.density,
                state.allowedPressureDrop,
                action.allowedVelocity
            )
            if (selectedPipe === undefined) return { ...state, pipe: "", velocity: "", pressureDrop: "", allowedVelocity: action.allowedVelocity }
            const velocity = calculateVelocity(state.flow, seamPipes[selectedPipe].innerDiameter / 1000).toFixed(2);
            const unitPressureDrop = calculateUnitPipePressureDrop(
                seamPipes[selectedPipe].innerDiameter / 1000,
                action.density,
                velocity,
                action.dynamicViscosity
            ).toFixed(0);

            return { ...state, pipe: selectedPipe, allowedVelocity: action.allowedVelocity, velocity, pressureDrop: unitPressureDrop }
        }

        default: return { ...state }
    }
}