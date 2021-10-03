import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useEffect, useReducer } from "react";
import { stateReducer } from "../Hooks/stateReducer";
import getDispatchObj from "../Data/dispatchObj";
import initialState from "../Data/initialState";

export function SelectPipeByCapacityMode() {

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const { capacity, delta, allowedPressureDrop, allowedVelocity, pipe, flow, velocity, pressureDrop } = state;

  useEffect(() => {
    dispatch({
      type: 'setPipe'
    })
  }, []);

  const handleInputChange = (e) => {
    dispatch(getDispatchObj(e))
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