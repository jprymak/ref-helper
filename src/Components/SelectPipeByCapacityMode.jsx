import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useState, useEffect, useReducer } from "react";
import { getMediumParameters } from "../Helpers/index.js";
import { stateReducer } from "../Hooks/stateReducer";
import water from "../Data/water";
import initialState from "../Data/initialState";

export function SelectPipeByCapacityMode() {

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const { temperature, capacity, delta, allowedPressureDrop, allowedVelocity, pipe, flow, velocity, pressureDrop } = state;

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
        pipe={pipe}
        flow={flow}
        velocity={velocity}
        pressureDrop={pressureDrop}
      />
      <Form
        onInputChange={handleInputChange}
        inputs={{
          capacity,
          delta,
          allowedPressureDrop,
          allowedVelocity
        }}
      />
    </div>
  );
}