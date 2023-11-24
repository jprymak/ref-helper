import React from "react";

import "./index.scss";

import { IRenderedItems } from "Pages/FastCalc/FastCalc";

interface SelectionInfoProps {
  infoProps: IRenderedItems;
}

export default function SelectionInfo({ infoProps }: SelectionInfoProps) {
  const renderSwitch = (key: string) => {
    switch (key) {
      case "pipe":
        return (
          <p key={key} className="selection-info__item">
            {" "}
            Selected pipe: <strong>DN {infoProps[key]}</strong>
          </p>
        );
      case "flow":
        return (
          <p key={key} className="selection-info__item">
            {" "}
            Flow: {infoProps[key]} m3/h
          </p>
        );
      case "velocity":
        return (
          <p key={key} className="selection-info__item">
            {" "}
            Velocity: {infoProps[key]} m/s
          </p>
        );
      case "pressureDrop":
        return (
          <p key={key} className="selection-info__item">
            {" "}
            Pressure drop: {infoProps[key]} Pa/m
          </p>
        );
      default:
        return null;
    }
  };
  return (
    <div className="selection-info">
      {Object.keys(infoProps).map((key) => renderSwitch(key))}
    </div>
  );
}
