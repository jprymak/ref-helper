import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { pick, truncate } from "lodash";

import { useGlobalContext } from "context";

import { Form } from "Components/Form";
import { SelectionInfo } from "Components/SelectionInfo";
import { Input } from "Components/Form/Input";
import { Select } from "Components/Form/Select";
import { Table } from "Components/Table";
import { useWindowSize } from "Hooks/useWindowSize";

import { stateReducer } from "Components/Reducers/fastCalcReducer";

import getAction from "Data/getAction";
import initialState from "Data/initialState";
import { generatePipeResults } from "Utils/fluidMechanicsFormulas";

import findCurrentModeInLinks from "../../Utils/helpers";
import { Mode } from "../../Data/sublinks";

import * as fluids from "Data/fluids";
import { FluidType } from "Data/fluids";
import seamPipes from "Data/pipes";

import "./FastCalc.scss";

interface IFluidsLibrary {
  [key: string]: FluidType;
}

interface IRenderedItems {
  [key: string]: string | number;
}

const media: IFluidsLibrary = { ...fluids };

export default function FastCalc(): JSX.Element | null {
  const { closeSubmenu } = useGlobalContext();
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [tableData, setTableData] = useState<any[]>([]);
  const { mode } = useParams<{ mode: string }>();
  const { screenWidth } = useWindowSize();

  useEffect(() => {
    dispatch({ type: "initialCalc" });
  }, [mode]);

  useEffect(() => {
    if (typeof state.dynamicViscosity === "string") return;
    const results = generatePipeResults(
      seamPipes,
      state.flow,
      state.dynamicViscosity,
      state.density
    );
    setTableData(results);
  }, [state.flow, state.dynamicViscosity, state.density]);

  function truncate(string: string): string {
    if (string.includes(" ")) {
      const stringArray: string[] = string.split(" ");
      stringArray.splice(0, 1, stringArray[0][0] + ". ");
      const truncatedString = stringArray.join(" ");
      return truncatedString;
    } else {
      return string;
    }
  }

  const pickedMode: Mode | undefined = findCurrentModeInLinks(mode);

  if (
    !pickedMode ||
    pickedMode.inputs === undefined ||
    pickedMode.info === undefined
  )
    return null;

  const inputs: string[] = pickedMode.inputs;
  const inputsToRender: IRenderedItems = pick(state, pickedMode.inputs);
  const infoToRender: IRenderedItems = pick(state, pickedMode.info);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(getAction(e, mode));
  };

  const inputRenderSwitch = (key: string) => {
    switch (key) {
      case "flow":
        return (
          <Input
            key={key}
            name="flow-input"
            label="Flow"
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
            label="Allowed velocity"
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
            label="Allowed pressure drop"
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
            label="Delta"
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
            label="Capacity"
            onInputChange={handleInputChange}
            type="number"
            // min={0}
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
            {Object.keys(media).map((option, index) => (
              <option
                key={index}
                value={option}
                label={
                  screenWidth > 850
                    ? media[option].name
                    : truncate(media[option].name)
                }
              ></option>
            ))}
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
            {Object.keys(media[state.medium].parameters)
              .sort((a, b) => Number(a) - Number(b))
              .map((option, index) => (
                <option key={index} value={option} label={option}></option>
              ))}
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mode" onMouseOver={closeSubmenu}>
      <SelectionInfo infoProps={infoToRender} />
      <div className="grid-content">
        <Form>{inputs.map((key: string) => inputRenderSwitch(key))}</Form>
        <Table tableData={tableData} selected={state.pipe} />
      </div>
    </div>
  );
}
