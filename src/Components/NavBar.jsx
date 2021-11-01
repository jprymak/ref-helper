import React from "react";
import ReactDOM from "react-dom";


import { useGlobalContext } from "../context";

import links from "../Data/sublinks";
import {NavLink, useLocation} from "react-router-dom";

export function NavBar({currentMode, onModeChange}) {
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
          links.map(link => {
            const {id,page, icon, url, modes} = link;
            return (
              <li key={id} className={`${location.pathname===url ? "navbar__list-item--active" : ""}`} onMouseOver={displaySubmenu}>
                <NavLink onClick={page!=="home" ? ()=>onModeChange(modes[0].id) :  ()=>onModeChange(null)} className="navbar__list-item" to={url}>{icon}{page}</NavLink>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default NavBar;
