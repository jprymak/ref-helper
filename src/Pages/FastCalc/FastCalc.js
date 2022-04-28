import React from "react";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "context";

import { Form } from "Components/Form";
import { SelectionInfo } from "Components/SelectionInfo";
import { Input } from "Components/Form/Input";
import { Select } from "Components/Form/Select";

import { useEffect, useReducer } from "react";
import { stateReducer } from "Utils/fastCalcReducer";
import getDispatchObj from "Data/dispatchObj";
import initialState from "Data/initialState";

import findCurrentModeInLinks from "../../Utils/helpers";
import * as propyleneGlycol from "../../Data/propyleneGlycol";
import * as ethyleneGlycol from "../../Data/ethyleneGlycol";
import {water} from "../../Data/water";

const media = {...propyleneGlycol, ...ethyleneGlycol, water};

export default function FastCalc() {
  const { closeSubmenu } = useGlobalContext();
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { mode } = useParams();

  useEffect(() => {
    dispatch({ type: "initialCalc" });
  }, [mode]);

  const pickedMode = findCurrentModeInLinks(mode);
  const inputs = pickedMode.inputs;
  const info = pickedMode.info;

  const convertArrayToObject = (array, source) => {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item]: source[item],
      };
    }, {});
  };

  const handleInputChange = (e) => {
    dispatch(getDispatchObj(e, mode));
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

        case "medium":
        return (
          <Select
            key={key}
            name="medium-select"
            label="Medium"
            onInputChange={handleInputChange}
            options={Object.keys(media)}
            value={convertedInputs[key]}
            unit="-"
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
