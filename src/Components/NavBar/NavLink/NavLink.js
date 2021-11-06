import classNames from "classnames";

import { Link, useLocation } from "react-router-dom";

export default function NavLink({ data, handleNavLinkClick, displaySubmenu }) {
    const { page, icon, url, modes } = data;
    const location = useLocation();
    const listItemClasses = classNames({
        "navbar__list-item": true,
        "navbar__list-item--active": location.pathname === url
    });
    return (
        <li className={listItemClasses} onMouseOver={displaySubmenu}>
            <Link onClick={() => handleNavLinkClick(page, modes)} className="navbar__link" to={url}>{icon}{page}</Link>
        </li>
    );
}
