import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useState, useEffect, useReducer } from "react";
import { getMediumParameters } from "../Helpers/index.js";
import { stateReducer } from "../Hooks/stateReducer";
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

export function SelectPipeByCapacityMode() {

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