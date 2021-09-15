import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useState, useEffect, useReducer } from "react";
import {
  selectPipe,
  getMediumParameters,
  calculateVelocity,
  calculateUnitPipePressureDrop,
} from "../Helpers/index.js";
import seamPipes from "../Data/pipes";
import water from "../Data/water";

const initialState = {
  temperature: 20,
  flow: 10,
  velocity: null,
  pressureDrop: null,
  allowedPressureDrop: 300,
  allowedVelocity: 2,
  pipe: 15
}

const reducer = (state, action) => {
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

export function RefHelper() {

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
      case "flow-input": {
        dispatch({ type: 'setFlow', dynamicViscosity, density, flow: e.target.value })
      }; break;
      case "allowed-velocity-input": dispatch({ type: 'setAllowedVelocity', dynamicViscosity, density, allowedVelocity: e.target.value }); break;
      case "allowed-pressure-drop-input": dispatch({ type: 'setAllowedPressureDrop', dynamicViscosity, density, allowedPressureDrop: e.target.value }); break;
      default: return;
    }
  };

  return (
    <div className="ref-helper">
      <SelectionInfo
        pipe={state.pipe}
        velocity={state.velocity}
        pressureDrop={state.pressureDrop}
      />
      <Form
        onInputChange={handleInputChange}
        flow={state.flow}
        allowedPressureDrop={state.allowedPressureDrop}
        allowedVelocity={state.allowedVelocity}
      />
    </div>
  );
}
