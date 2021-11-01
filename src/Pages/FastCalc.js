import React from "react";

import { useGlobalContext } from "../context";

import { Form } from "../Components/Form";
import { SelectionInfo } from "../Components/SelectionInfo";

import { useEffect, useReducer } from "react";
import { stateReducer } from "../Hooks/stateReducer";
import getDispatchObj from "../Data/dispatchObj";
import initialState from "../Data/initialState";

export default function FastCalc({info, inputs}) {
const {closeSubmenu} = useGlobalContext();
const [state, dispatch] = useReducer(stateReducer, initialState);


useEffect(()=>{
  dispatch({type: "setStateToInitial", payload: initialState});
  dispatch({type: "setPipe"});
  },[info, inputs]);

const convertArrayToObject = (array, source) => {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item]: source[item],
      };
    }, {});
  };

  const handleInputChange = (e) => {
    dispatch(getDispatchObj(e));
  };

  return (
    <div className="mode" onMouseOver={closeSubmenu}>
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