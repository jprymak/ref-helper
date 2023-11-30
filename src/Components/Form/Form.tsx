import React from "react";

import "./index.scss";

interface FormProps {
  children: React.ReactNode;
}

export default function Form({ children }: FormProps) {
  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        {children}
      </form>
    </div>
  );
}
