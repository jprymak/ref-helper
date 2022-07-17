import React from "react";

import "./index.scss";

interface IProps{
    name: string;
    label: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    type: string;
    min?: number;
    max?: number;
    value: string | number;
    unit: string;
    step?: string;
}


function Input({name, label, onInputChange, type, min, max, value, unit, step}: IProps) {
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