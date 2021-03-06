
import React, { useRef, useEffect } from "react";


import { useGlobalContext } from "../../context";

import { Sublink } from "Components/Submenu/Sublink";

import "./index.scss";

export default function Submenu() {
    const { isSubmenuOpen, page: { page, modes }, location, closeSubmenu } = useGlobalContext();
    const container = useRef(null);
    useEffect(() => {
        const submenu = container.current;
        const { center, bottom } = location;
        submenu.style.left = `${center}px`;
        submenu.style.top = `${bottom}px`;
    }, [page, location]);

    const handleSublinkClick = () => {
        closeSubmenu();
    };

    if (!modes) return null;

    return (
        <aside className={isSubmenuOpen ? "submenu show" : "submenu"} ref={container}>
            <h3 className="submenu__heading">{page}</h3>
            <ul className="sublinks">{Object.keys(modes).map((mode) => {
                const { id, name, url } = modes[mode];
                return <Sublink key={id} handleSublinkClick={handleSublinkClick} name={name} url={url} />;
            })}</ul>
        </aside>
    );
}