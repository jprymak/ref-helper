import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { useGlobalContext } from "context";

import { Form } from "Components/Form";
import { SelectionInfo } from "Components/SelectionInfo";
import { Input } from "Components/Form/Input";
import { Select } from "Components/Form/Select";



import { stateReducer, FastCalcState, FastCalcAction } from "Utils/fastCalcReducer";

import getAction from "Data/getAction";
import initialState from "Data/initialState";

import findCurrentModeInLinks from "../../Utils/helpers";

import * as fluids from "Data/fluids";
import { FluidType } from "Data/fluids";

interface IFluidsLibrary {
  [key: string]: FluidType
}

const media: IFluidsLibrary = { ...fluids };

export default function FastCalc(): JSX.Element {
  const { closeSubmenu } = useGlobalContext();
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { mode } = useParams<{ mode: string }>();

  useEffect(() => {
    dispatch({ type: "initialCalc" });
  }, [mode]);

  const pickedMode = findCurrentModeInLinks(mode);
  const inputs = pickedMode.inputs;
  const info = pickedMode.info;

  const mapKeysToObject = function (array: string[], source: { [key: string]: string }){
    const obj: { [key: string]: string } = {};
    array.forEach(key => obj[key] = source[key]);
    return obj;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(getAction(e, mode));
  };

  const inputsToRender = mapKeysToObject(inputs, state);
  const infoToRender = mapKeysToObject(info, state);

  const inputRenderSwitch = (key: string) => {

    switch (key) {
      case "flow":
        return (
          <Input
            key={key}
            name="flow-input"
            label={`Flow (${inputsToRender[key]})`}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            value={inputsToRender[key]}
            unit="m3/h"
          />
        );

      case "allowedVelocity":
        return (
          <Input
            key={key}
            name="allowed-velocity-input"
            label={`Allowed velocity (${inputsToRender[key]})`}
            onInputChange={handleInputChange}
            type="range"
            min={1}
            max={5}
            step="0.1"
            value={inputsToRender[key]}
            unit="m/s"
          />
        );

      case "allowedPressureDrop":
        return (
          <Input
            key={key}
            name="allowed-pressure-drop-input"
            label={`Allowed pressure drop (${inputsToRender[key]})`}
            onInputChange={handleInputChange}
            type="range"
            min={100}
            max={1000}
            step="50"
            value={inputsToRender[key]}
            unit="Pa/m"
          />
        );

      case "delta":
        return (
          <Input
            key={key}
            name="delta-input"
            label={`Delta (${inputsToRender[key]})`}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            max={50}
            value={inputsToRender[key]}
            unit="K"
          />
        );

      case "capacity":
        return (
          <Input
            key={key}
            name="capacity-input"
            label={`Capacity (${inputsToRender[key]})`}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            value={inputsToRender[key]}
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
            value={inputsToRender[key]}
            unit="-"
          >
            {Object.keys(media).map((option, index) => <option key={index} value={option} label={media[option].name}></option>)}
          </Select>
        );

      case "temperature":
        return (
          <Select
            key={key}
            name="temperature-select"
            label="Temperature"
            onInputChange={handleInputChange}
            value={inputsToRender[key]}
            unit="°C"
          >
            {Object.keys(media[state.medium].parameters).sort((a, b) => Number(a) - Number(b)).map((option, index) => <option key={index} value={option} label={option}></option>)}
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mode" onMouseOver={closeSubmenu}>
      <SelectionInfo infoProps={infoToRender} />
      <Form>{inputs.map((key: string) => inputRenderSwitch(key))}</Form>
    </div>
  );
}
