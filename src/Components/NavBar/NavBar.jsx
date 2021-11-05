import React from "react";

import { useGlobalContext } from "../../context";

import links from "../../Data/sublinks";
import { NavLink } from "Components/NavLink";

import "./index.scss";

export default function NavBar({ onModeChange }) {

  const { openSubmenu, closeSubmenu } = useGlobalContext();

  const displaySubmenu = (e) => {
    const target = e.target.closest("li");
    const page = target.textContent;
    const tempBtn = target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom;
    openSubmenu(page, { center, bottom });
  };

  const handleSubmenu = (e) => {
    if (!e.target.closest(".navbar__list-item")) {
      closeSubmenu();
    }
  };

  const handleNavLinkClick = (page, modes) => {
    if (page !== "home") {
      onModeChange(modes[0].id);
    }
    else {
      onModeChange(null);
    }
    closeSubmenu();
  };
  return (
    <nav className="navbar" onMouseOver={handleSubmenu}>
      <ul className="navbar__list">
        {
          links.map(link => <NavLink key={link.id} data={link} displaySubmenu={displaySubmenu} handleNavLinkClick={handleNavLinkClick} />)
        }
      </ul>
    </nav>
  );
}
