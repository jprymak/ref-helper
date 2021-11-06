import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "context";

import classNames from "classnames";

import links from "Data/sublinks";

import {Sublink} from "./Sublink";

import "./index.scss";

export default function Sidebar({onModeChange,currentMode}){
  const { isSidebarOpen, closeSidebar} = useGlobalContext();

  const classes=classNames({
    "sidebar-wrapper": true,
    "sidebar-wrapper--show": isSidebarOpen
  });

  const handleSublinkClick = (id) =>{
    onModeChange(id);
    closeSidebar();
  };

  return (
    <div
      className={classes}
    >
      <aside className="sidebar">
        <button className="sidebar__close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-groups">
          {links.map(link=> {
            const { modes, page, id, icon, url } = link;
            return (
              <div className="sidebar-group" key={id}>
                <h4 className="sidebar-group__heading">{icon}{page}</h4>
                <ul className="sidebar-group__sublinks">
                  {modes ? modes.map((mode) => {
                    const {id, name } = mode;
                    return (
                      <Sublink key={id} active={currentMode.id===id} handleSublinkClick={handleSublinkClick} name={name} id={id} url={url}/>
                    );
                  }) : null}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

