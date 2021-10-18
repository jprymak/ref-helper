import React from "react";

import fastCalcModes from "../Data/fastCalcModes";

export function NavBar({ onModeChange, currentMode }) {

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {
          fastCalcModes.map(mode => {
            const { id, name } = mode;
            return (
              <li key={id} className="navbar__list-item">
                <button
                  className={`navbar__list-button ${(currentMode.id === id
                    ? "navbar__list-button--active"
                    : "")}`}
                  onClick={() => onModeChange(id)}
                >
                  {name}
                </button>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default NavBar;
