import React from "react";

export function NavBar({ onModeChange, currentMode }) {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__list-item">
          <button
            className={`navbar__list-button ${(currentMode ==="selectByFlow"
              ? "navbar__list-button--active"
              : "")}`}
            onClick={() => onModeChange("selectByFlow")}
          >
            Select By Flow
          </button>
        </li>
        <li className="navbar__list-item">
          <button
            className={`navbar__list-button ${(currentMode === "selectByCapacity"
              ? "navbar__list-button--active"
              : "")}`}
            onClick={() => onModeChange("selectByCapacity")}
          >
            Select By Capacity
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
