import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useState, useEffect, useReducer } from "react";
import {
  selectPipe,
  getMediumParameters,
  calculateVelocity,
  calculateUnitPipePressureDrop,
  calculateVolumetricFlow
} from "../Helpers/index.js";
import seamPipes from "../Data/pipes";
import water from "../Data/water";

const initialState = {
  capacity: 100,
  temperature: 20,
  flow: 10,
  velocity: null,
  pressureDrop: null,
  allowedPressureDrop: 300,
  allowedVelocity: 2,
  pipe: 15,
  delta: 4
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCapacity': {
      const specificHeat = 4.19;
      const flow = (calculateVolumetricFlow(action.capacity, state.delta, action.density, specificHeat)*3.6).toFixed(1)
      
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
      const flow = (calculateVolumetricFlow(state.capacity, action.delta, action.density, specificHeat)*3.6).toFixed(1)
      
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

export function SelectPipeByCapacityMode() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [temperature, setTemperature] = useState(20);

  let viscosityInCentipoise = getMediumParameters(
    water,
    temperature
  ).viscosity;
  let density = getMediumParameters(water, temperature).density;
  let dynamicViscosity = viscosityInCentipoise / 1000 / density;

  useEffect(() => {
    dispatch({
      type: 'setPipe', dynamicViscosity,
      density
    })
  }, []);

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "capacity-input": {
        dispatch({ type: 'setCapacity', dynamicViscosity, density, capacity: e.target.value })
      }; break;
      case "delta-input": {
        dispatch({ type: 'setDelta', dynamicViscosity, density, delta: e.target.value })
      }; break;
      case "allowed-velocity-input": dispatch({ type: 'setAllowedVelocity', dynamicViscosity, density, allowedVelocity: e.target.value }); break;
      case "allowed-pressure-drop-input": dispatch({ type: 'setAllowedPressureDrop', dynamicViscosity, density, allowedPressureDrop: e.target.value }); break;
      default: return;
    }
  };

  return (
    <div className="mode">
      <SelectionInfo
        pipe={state.pipe}
        flow={state.flow}
        velocity={state.velocity}
        pressureDrop={state.pressureDrop}
      />
      <Form
        onInputChange={handleInputChange}
        inputs={{
          capacity: state.capacity,
          delta: state.delta,
          allowedPressureDrop: state.allowedPressureDrop,
          allowedVelocity: state.allowedVelocity
        }} 
      />
    </div>
  );
}