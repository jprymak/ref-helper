import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { pick } from "lodash";
import { Form } from "Components/Form";
import { Input } from "Components/Form/Input";
import { Select } from "Components/Form/Select";
import { Table } from "Components/Table";
import { useWindowSize } from "Hooks/useWindowSize";

import { stateReducer } from "Reducers/fastCalcReducer";

import getAction from "Data/getAction";
import initialState from "Data/initialState";
import { generatePipeResults } from "Utils/fluidMechanicsFormulas";

import { findCurrentModeInLinks, truncate } from "../../Utils/helpers";
import { FastCalcStateKeyType, Mode } from "../../Data/links";

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

const media: IFluidsLibrary = { ...fluids };
const pipeTypes: IPipesLibrary = { ...pipes };

export default function FastCalc(): JSX.Element | null {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { mode } = useParams<{ mode: string }>();
  const { screenWidth } = useWindowSize();
  const { t } = useTranslation();

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
  const inputs = pickedMode.inputs;
  const inputsToRender = pick(state, pickedMode.inputs);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(getAction(e, mode));
  };

  const renderInput = (key: FastCalcStateKeyType) => {
    switch (key) {
      case "flow":
        return (
          <Input
            key={key}
            name="flow-input"
            label={t("flow")}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            value={inputsToRender[key]}
            unit="m3/h"
            errorMessage={state.errors.flow?.message}
          />
        );

      case "delta":
        return (
          <Input
            key={key}
            name="delta-input"
            label={t("delta")}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            max={50}
            value={inputsToRender[key]}
            unit="K"
            errorMessage={state.errors.delta?.message}
          />
        );

      case "capacity":
        return (
          <Input
            key={key}
            name="capacity-input"
            label={t("capacity")}
            onInputChange={handleInputChange}
            type="number"
            min={0}
            value={inputsToRender[key]}
            unit="kW"
            errorMessage={state.errors.capacity?.message}
          />
        );

      case "medium":
        return (
          <Select
            key={key}
            name="medium-select"
            label={t("medium")}
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
                    ? t(media[option].name, {
                        solution: media[option].solution,
                      })
                    : truncate(
                        t(media[option].name, {
                          solution: media[option].solution,
                        })
                      )
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
            label={t("pipeType")}
            onInputChange={handleInputChange}
            value={inputsToRender[key]}
            unit="-"
          >
            {Object.keys({ ...pipes }).map((option, index) => (
              <option key={index} value={option} label={t(option)}></option>
            ))}
          </Select>
        );

      case "temperature":
        return (
          <Select
            key={key}
            name="temperature-select"
            label={t("temperature")}
            onInputChange={handleInputChange}
            value={inputsToRender[key] || ""}
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
      <div className="selection-info">
        <p className="selection-info__item">
          {t("flow")}: <strong>{state.flow}</strong> m3/h
        </p>
      </div>

      <div className="grid-content">
        <Form>{inputs.map(renderInput)}</Form>
        <Table tableData={tableData} />
      </div>
    </div>
  );
}
