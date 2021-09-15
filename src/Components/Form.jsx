import React from "react";

export function Form({
  flow,
  allowedVelocity,
  allowedPressureDrop,
  onInputChange
}) {
  return (
    <form className="form">
      <label htmlFor="flow-input">Flow: </label>
      <input
        onChange={onInputChange}
        name="flow-input"
        type="number"
        min="0"
        value={flow}
      />
      <span>m3/h</span>
      <label htmlFor="allowed-velocity-input">
        Allowed velocity ({allowedVelocity}):{" "}
      </label>
      <input
        onChange={onInputChange}
        name="allowed-velocity-input"
        value={allowedVelocity}
        type="range"
        step="0.1"
        min="1"
        max="3"
      />
      <span>m/s</span>
      <label htmlFor="allowed-pressure-drop-input">
        Allowed pressure drop ({allowedPressureDrop}):{" "}
      </label>
      <input
        onChange={onInputChange}
        name="allowed-pressure-drop-input"
        value={allowedPressureDrop}
        type="range"
        step="50"
        min="100"
        max="1000"
      />
      <span>Pa/m</span>
    </form>
  );
}
