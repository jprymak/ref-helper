import React from "react";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";
import {Link} from "react-router-dom";

import { useGlobalContext } from "context";

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

  const handleNavLinkClick = (page, modes) => {
    if (page !== "home") {
      onModeChange(modes[0].id);
    }
    else {
      onModeChange(null);
    }
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
                <h4 className="sidebar-group__heading"><Link onClick={()=>handleNavLinkClick(page, modes)} to={url}>{icon}{page}</Link></h4>
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

