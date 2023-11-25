import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { pick } from "lodash";

import { Form } from "Components/Form";
import { SelectionInfo } from "Components/SelectionInfo";
import { Input } from "Components/Form/Input";
import { Select } from "Components/Form/Select";
import { Table } from "Components/Table";
import { useWindowSize } from "Hooks/useWindowSize";

import { stateReducer } from "Reducers/fastCalcReducer";

import getAction from "Data/getAction";
import initialState from "Data/initialState";
import { generatePipeResults } from "Utils/fluidMechanicsFormulas";

import {
  findCurrentModeInLinks,
  getLabelForPipes,
  truncate,
} from "../../Utils/helpers";
import { Mode } from "../../Data/links";

import * as fluids from "Data/fluids";
import { FluidType } from "Data/fluids";
import * as pipes from "Data/pipes";
import { PipesObject } from "Data/pipes";

import "./FastCalc.scss";

interface IFluidsLibrary {
  [key: string]: FluidType;
}
interface IPipesLibrary {
  [key: string]: PipesObject;
}

export interface IRenderedItems {
  [key: string]: string | number;
}

const media: IFluidsLibrary = { ...fluids };
const pipeTypes: IPipesLibrary = { ...pipes };

export default function FastCalc(): JSX.Element | null {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { mode } = useParams<{ mode: string }>();
  const { screenWidth } = useWindowSize();

  useEffect(() => {
    dispatch({ type: "initialCalc" });
  }, [mode]);

  const tableData = generatePipeResults(
    pipeTypes[state.pipeType],
    state.flow,
    state.dynamicViscosity,
    state.density
  );

  const pickedMode: Mode = findCurrentModeInLinks(mode);
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

  const renderInput = (key: string) => {
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

      case "pipeType":
        return (
          <Select
            key={key}
            name="pipe-type-select"
            label="Pipe type"
            onInputChange={handleInputChange}
            value={inputsToRender[key]}
            unit="-"
          >
            {Object.keys({ ...pipes }).map((option, index) => (
              <option
                key={index}
                value={option}
                label={getLabelForPipes(option)}
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
    <div className="mode">
      <SelectionInfo infoProps={infoToRender} />
      <div className="grid-content">
        <Form>{inputs.map(renderInput)}</Form>
        <Table tableData={tableData} />
      </div>
    </div>
  );
}
