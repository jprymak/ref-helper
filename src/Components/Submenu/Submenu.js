
import React, {useRef, useEffect } from "react";
import {
  NavLink
} from "react-router-dom";

import { useGlobalContext } from "../../context";


export default function Submenu({ onModeChange, currentMode }) {
    const { isSubmenuOpen, page: { page,modes, url }, location } = useGlobalContext();
    const container = useRef(null);
    useEffect(() => {
        const submenu = container.current;
        const { center, bottom } = location;
        submenu.style.left = `${center}px`;
        submenu.style.top = `${bottom}px`;
    }, [page, location]);
    return(
<aside className={isSubmenuOpen ? "submenu show" : "submenu"} ref={container}>
    <h3 className="submenu__heading">{page}</h3>
    <div className="sublinks">{modes.map(({id, name})=>(
        <NavLink key={id} className={`sublinks__sublink ${(currentMode.id === id
          ? "sublinks__sublink--active"
          : "")}`}
        onClick={() => onModeChange(id)} to={url}>{name}</NavLink>
    ))}</div>
    </aside>
    );
}