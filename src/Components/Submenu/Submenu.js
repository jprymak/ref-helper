
import React, {useRef, useEffect } from "react";
import {
  NavLink
} from "react-router-dom";

import { useGlobalContext } from "../../context";

import "./index.scss";

export default function Submenu({ onModeChange, currentMode }) {
    const { isSubmenuOpen, page: { page,modes, url }, location , closeSubmenu} = useGlobalContext();
    const container = useRef(null);
    useEffect(() => {
        const submenu = container.current;
        const { center, bottom } = location;
        submenu.style.left = `${center}px`;
        submenu.style.top = `${bottom}px`;
    }, [page, location]);

    const handleNavLinkClick = (id) =>{
      onModeChange(id);
      closeSubmenu();
    };
    return(
<aside className={isSubmenuOpen ? "submenu show" : "submenu"} ref={container}>
    <h3 className="submenu__heading">{page}</h3>
    <div className="sublinks">{modes.map(({id, name})=>(
        <NavLink key={id} className={`sublinks__sublink ${(currentMode.id === id
          ? "sublinks__sublink--active"
          : "")}`}
        onClick={() => handleNavLinkClick(id)} to={url}>{name}</NavLink>
    ))}</div>
    </aside>
    );
}