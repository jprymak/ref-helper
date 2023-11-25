import React from "react";

import links from "../../Data/links";
import { NavLink } from "Components/NavBar/NavLink";

import "./index.scss";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {links.map((link) => (
          <NavLink key={link.id} data={link} />
        ))}
      </ul>
    </nav>
  );
}
