import React from "react";

export function NavBar({onModeChange}) {

    return (
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__list-item"><button onClick={()=>onModeChange('selectByFlow')}>Select By Flow</button></li>
          <li className="navbar__list-item"><button onClick={()=>onModeChange('selectByCapacity')}>Select By Capacity</button></li>
        </ul>
      </nav>
    );
  }
  
  export default NavBar;