import React from "react";

import { useGlobalContext } from "context";

import { Form } from "Components/Form";
import { SelectionInfo } from "Components/SelectionInfo";
import { Input } from "Components/Form/Input";

import { useEffect, useReducer } from "react";
import { stateReducer } from "Utils/fastCalcReducer";
import getDispatchObj from "Data/dispatchObj";
import initialState from "Data/initialState";

export default function FastCalc({ info, inputs }) {
  const { closeSubmenu } = useGlobalContext();
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    dispatch({ type: "setStateToInitial", payload: initialState });
    dispatch({ type: "setPipe" });
  }, [info, inputs]);

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

  const convertedInputs = convertArrayToObject(inputs, state);
  const convertedInfo = convertArrayToObject(info, state);

  const inputRenderSwitch = (key) => {
    switch (key) {
      case "flow":
        return (
          <Input
            key={key}
            name="flow-input"
            label={`Flow (${convertedInputs[key]})`}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            value={convertedInputs[key]}
            unit="m3/h"
          />
        );

      case "allowedVelocity":
        return (
          <Input
            key={key}
            name="allowed-velocity-input"
            label={`Allowed velocity (${convertedInputs[key]})`}
            onInputChange={handleInputChange}
            type="range"
            min={1}
            max={5}
            step="0.1"
            value={convertedInputs[key]}
            unit="m/s"
          />
        );

      case "allowedPressureDrop":
        return (
          <Input
            key={key}
            name="allowed-pressure-drop-input"
            label={`Allowed pressure drop (${convertedInputs[key]})`}
            onInputChange={handleInputChange}
            type="range"
            min={100}
            max={1000}
            step="50"
            value={convertedInputs[key]}
            unit="Pa/m"
          />
        );

      case "delta":
        return (
          <Input
            key={key}
            name="delta-input"
            label={`Delta (${convertedInputs[key]})`}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            max={50}
            value={convertedInputs[key]}
            unit="K"
          />
        );

      case "capacity":
        return (
          <Input
            key={key}
            name="capacity-input"
            label={`Capacity (${convertedInputs[key]})`}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            value={convertedInputs[key]}
            unit="kW"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mode" onMouseOver={closeSubmenu}>
      <SelectionInfo infoProps={convertedInfo} />
      <Form>{inputs.map((key) => inputRenderSwitch(key))}</Form>
    </div>
  );
}
