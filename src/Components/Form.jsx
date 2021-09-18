import React from "react";

export function Form({ inputs, onInputChange }) {
  return (
    <form className="form">
      {Object.keys(inputs).map((key) => {
        switch (key) {
          case "flow":
            return (
              <React.Fragment key={key}>
                <label htmlFor="flow-input">Flow: </label>
                <input
                  onChange={onInputChange}
                  name="flow-input"
                  type="number"
                  min="0"
                  value={inputs[key]}
                />
                <span>m3/h</span>
              </React.Fragment>
            );
          case "allowedVelocity":
            return (
              <React.Fragment key={key}>
                <label htmlFor="allowed-velocity-input">
                  Allowed velocity ({inputs[key]}):{" "}
                </label>
                <input
                  onChange={onInputChange}
                  name="allowed-velocity-input"
                  value={inputs[key]}
                  type="range"
                  step="0.1"
                  min="1"
                  max="3"
                />
                <span>m/s</span>
              </React.Fragment>
            );

          case "allowedPressureDrop":
            return (
              <React.Fragment key={key}>
                <label htmlFor="allowed-pressure-drop-input">
                  Allowed pressure drop ({inputs[key]}):{" "}
                </label>
                <input
                  onChange={onInputChange}
                  name="allowed-pressure-drop-input"
                  value={inputs[key]}
                  type="range"
                  step="50"
                  min="100"
                  max="1000"
                />
                <span>Pa/m</span>
              </React.Fragment>
            );

            case "delta":
            return (
              <React.Fragment key={key}>
                <label htmlFor="delta-input">
                  Delta ({inputs[key]}):{" "}
                </label>
                <input
                  onChange={onInputChange}
                  name="delta-input"
                  value={inputs[key]}
                  type="range"
                  step="1"
                  min="1"
                  max="20"
                />
                <span>K</span>
              </React.Fragment>
            );

            case "capacity":
              return (
                <React.Fragment key={key}>
                  <label htmlFor="capacity-input">Capacity: </label>
                  <input
                    onChange={onInputChange}
                    name="capacity-input"
                    type="number"
                    min="0"
                    value={inputs[key]}
                  />
                  <span>kW</span>
                </React.Fragment>
              );
        }
      })}
    </form>
  );
}
