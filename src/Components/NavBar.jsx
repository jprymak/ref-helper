import React from "react";
import ReactDOM from "react-dom";


import { useGlobalContext } from "../context";

import links from "../Data/sublinks";
import {useLocation} from "react-router-dom";

export function NavBar({currentMode}) {
const {openSubmenu, closeSubmenu} = useGlobalContext();
const location = useLocation();

const displaySubmenu = (e) =>{
  const target = e.target.closest("li");
  const page = target.textContent;
  const tempBtn = target.getBoundingClientRect();
  const center = (tempBtn.left+tempBtn.right)/2;
  const bottom = tempBtn.bottom;
  openSubmenu(page, {center, bottom});
};

const handleSubmenu = (e) => {
  if (!e.target.closest(".navbar__list-item")) {
    closeSubmenu();
  }
};
  return (
    <nav className="navbar" onMouseOver={handleSubmenu}>
      <ul className="navbar__list">
        {
          links.map(mode => {
            const {id,page, icon, url} = mode;
            return (
              <li key={id} className={`navbar__list-item ${location.pathname===url ? "navbar__list-item--active" : ""}`} onMouseOver={displaySubmenu}>
                {icon}
                {page}
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default NavBar;
