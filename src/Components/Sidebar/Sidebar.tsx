import React from "react";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";

import { useGlobalContext } from "context";

import links from "Data/sublinks";

import { Sublink } from "./Sublink";

import "./index.scss";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  const classes = classNames({
    "sidebar-wrapper": true,
    "sidebar-wrapper--show": isSidebarOpen,
  });

  const handleSublinkClick = () => {
    closeSidebar();
  };

  return (
    <div className={classes}>
      <aside className="sidebar">
        <button className="sidebar__close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-groups">
          {links.map((link) => {
            const { modes, page, id, icon } = link;
            return (
              <div className="sidebar-group" key={id}>
                <h4 className="sidebar-group__heading">
                  {icon}
                  {page}
                </h4>
                <ul className="sidebar-group__sublinks">
                  {modes?.map((mode) => {
                    const { id, name, url } = mode;
                    return (
                      <Sublink
                        key={id}
                        handleSublinkClick={handleSublinkClick}
                        name={name}
                        url={url}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
