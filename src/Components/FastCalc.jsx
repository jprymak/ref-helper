import React from "react";
import { Form } from "./Form";
import { SelectionInfo } from "./SelectionInfo";

import { useEffect, useReducer } from "react";
import { stateReducer } from "../Hooks/stateReducer";
import getDispatchObj from "../Data/dispatchObj";
import initialState from "../Data/initialState";

export function FastCalc({info, inputs}) {

const [state, dispatch] = useReducer(stateReducer, initialState)

const convertArrayToObject = (array, source) => {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item]: source[item],
      };
    }, {});
  };

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
      infoProps={convertArrayToObject(info, state)}
      />
      <Form
        onInputChange={handleInputChange}
        inputs={convertArrayToObject(inputs, state)}
      />
    </div>
  );
}