import React from "react";

import "./index.scss";
import { useTranslation } from "react-i18next";

interface IProps {
  name: string;
  label: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  min?: number;
  max?: number;
  value: string | number;
  unit: string;
  step?: string;
  errorMessage?: string;
}

function Input({
  name,
  label,
  onInputChange,
  type,
  min,
  max,
  value,
  unit,
  step,
  errorMessage,
}: IProps) {
  const { t } = useTranslation();
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {type === "range" ? <span className="input-value">{value}</span> : null}
        <input
          className={errorMessage && "input--error"}
          onChange={onInputChange}
          id={name}
          name={name}
          type={type}
          min={min}
          max={max}
          value={value}
          step={step}
        />
      </div>
      <span>{unit}</span>
      {errorMessage && <p className="error-message">{t(errorMessage)}</p>}
    </>
  );
}

export default Input;
