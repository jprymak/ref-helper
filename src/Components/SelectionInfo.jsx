import React from "react";

export function SelectionInfo({
    pipe, velocity, pressureDrop
}) {
  return (
    <div className="selection-info">
      <p className="selection-info__item"> Selected pipe: <strong>DN {pipe}</strong></p>
      <p className="selection-info__item"> Velocity: {velocity} m/s</p>
      <p className="selection-info__item"> Pressure drop: {pressureDrop} Pa/m</p>
    </div>
  );
}
