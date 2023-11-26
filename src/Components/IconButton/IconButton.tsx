import React from "react";

import "./index.scss";

interface IconButtonProps {
  icon: JSX.Element;
  onClick: () => void;
}

function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button className="icon-btn" onClick={onClick}>
      {icon}
    </button>
  );
}

export default IconButton;
