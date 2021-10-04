import React from "react";


export function SelectionInfo({
  infoProps
}) {
  return (
    <div className="selection-info">
      {
        Object.keys(infoProps).map(key => {
          switch (key) {
            case "pipe": return <React.Fragment key={key}><p className="selection-info__item"> Selected pipe: <strong>DN {infoProps[key]}</strong></p></React.Fragment >
            case "flow": return <React.Fragment key={key}><p className="selection-info__item"> Flow: {infoProps[key]} m3/h</p></React.Fragment >
            case "velocity": return <React.Fragment key={key}><p className="selection-info__item"> Velocity: {infoProps[key]} m/s</p></React.Fragment>
            case "pressureDrop": return <React.Fragment key={key}><p className="selection-info__item"> Pressure drop: {infoProps[key]} Pa/m</p></React.Fragment>
            default: return null
          }
        })
      }
    </div>
  );
}
