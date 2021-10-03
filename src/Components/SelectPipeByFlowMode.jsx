import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import {useEffect, useReducer } from "react";
import initialState from "../Data/initialState";
import getDispatchObj from "../Data/dispatchObj";
import {stateReducer} from "../Hooks/stateReducer";

export function SelectPipeByFlowMode() {

  const [state, dispatch] = useReducer(stateReducer, initialState)
  const {pipe, velocity, pressureDrop, flow, allowedPressureDrop, allowedVelocity} = state;

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
        velocity={velocity}
        pressureDrop={pressureDrop}
      />
      <Form
        onInputChange={handleInputChange}
        inputs={{
          flow,
          allowedPressureDrop,
          allowedVelocity
        }}
      />
    </div>
  );
}