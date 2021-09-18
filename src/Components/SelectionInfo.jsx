import React from "react";


export function SelectionInfo({
  ...props
}) {
  return (
    <div className="selection-info">
      {
        Object.keys(props).map(key => {
          switch (key) {
            case "pipe": return <React.Fragment key={key}><p className="selection-info__item"> Selected pipe: <strong>DN {props[key]}</strong></p></React.Fragment >
            case "flow": return <React.Fragment key={key}><p className="selection-info__item"> Flow: {props[key]} m3/h</p></React.Fragment >
            case "velocity": return <React.Fragment key={key}><p className="selection-info__item"> Velocity: {props[key]} m/s</p></React.Fragment>
            case "pressureDrop": return <React.Fragment key={key}><p className="selection-info__item"> Pressure drop: {props[key]} Pa/m</p></React.Fragment>
            default: return null
          }
        })
      }
    </div>
  );
}
