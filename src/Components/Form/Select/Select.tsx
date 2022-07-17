
import React from "react";

import "./index.scss";

interface IProps{
    children: JSX.Element[];
    name: string;
    label: string;
    onInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string | number;
    unit: string;
}

function Select({ children, label, unit, name, onInputChange, value }: IProps){
    return (
        <>
        <label htmlFor={ name }> { label } </label>
        <select name={name} onChange={onInputChange} value={value}>
            {children}
            </select>
            <span>{unit}</span>
            </>
    );
};

export default Select;