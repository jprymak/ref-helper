import React from "react";

import "./index.scss";

export default function Form({children}) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="form">
      {children}
    </form>
  );
}
