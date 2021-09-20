import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useState, useEffect, useReducer } from "react";
import {getMediumParameters} from "../Helpers/index.js";
import water from "../Data/water";
import {stateReducer} from "../Hooks/stateReducer";

const initialState = {
  temperature: 20,
  flow: 10,
  velocity: null,
  pressureDrop: null,
  allowedPressureDrop: 300,
  allowedVelocity: 2,
  pipe: 15
}

export function SelectPipeByFlowMode() {

  const [state, dispatch] = useReducer(stateReducer, initialState)
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
    <div className="mode">
      <SelectionInfo
        pipe={state.pipe}
        velocity={state.velocity}
        pressureDrop={state.pressureDrop}
      />
      <Form
        onInputChange={handleInputChange}
        inputs={{
          flow: state.flow,
          allowedPressureDrop: state.allowedPressureDrop,
          allowedVelocity: state.allowedVelocity
        }}
      />
    </div>
  );
}