
import React, {useRef, useEffect } from "react";


import { useGlobalContext } from "../../context";

import {Sublink} from "Components/Submenu/Sublink";

import "./index.scss";

export default function Submenu({ onModeChange, currentMode }) {
    const { isSubmenuOpen, page: { page, modes, url }, location , closeSubmenu} = useGlobalContext();
    const container = useRef(null);
    useEffect(() => {
        const submenu = container.current;
        const { center, bottom } = location;
        submenu.style.left = `${center}px`;
        submenu.style.top = `${bottom}px`;
    }, [page, location]);

    const handleSublinkClick = (id) =>{
      onModeChange(id);
      closeSubmenu();
    };
    return(
<aside className={isSubmenuOpen ? "submenu show" : "submenu"} ref={container}>
    <h3 className="submenu__heading">{page}</h3>
    <ul className="sublinks">{modes.map(({id, name})=>(
        <Sublink key={id}  handleSublinkClick={handleSublinkClick} active={currentMode.id===id} id={id} name={name} url={url}/>
    ))}</ul>
    </aside>
    );
}