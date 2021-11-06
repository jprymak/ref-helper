import React from "react";

import "./index.scss";

function Input({name, label, onInputChange, type, min, max, value, unit, step}) {
    return (
        <>
            <label htmlFor={name}>{label}:</label>
                <input
                  onChange={onInputChange}
                  id={name}
                  name={name}
                  type={type}
                  min={min}
                  max={max}
                  value={value}
                  step={step}
                />
                <span>{unit}</span>
        </>
    );
}

export default Input;