import React from "react";

import { FastCalcAction } from "Reducers/fastCalcReducer";

const getAction = (
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  mode: string | undefined
): FastCalcAction => {
  switch (e.target.name) {
    case "capacity-input":
      return { type: "setCapacity", payload: e.target.value };
    case "delta-input":
      return { type: "setDelta", payload: e.target.value };
    case "flow-input":
      return { type: "setFlow", payload: e.target.value };
    case "medium-select":
      return { type: "setMedium", payload: e.target.value, mode: mode || "" };
    case "pipe-type-select":
      return { type: "setPipeType", payload: e.target.value };
    case "temperature-select":
      return {
        type: "setTemperature",
        payload: +e.target.value,
        mode: mode || "",
      };
    default:
      return { type: "initialCalc" };
  }
};

export default getAction;
