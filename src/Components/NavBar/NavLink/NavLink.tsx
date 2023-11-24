import classNames from "classnames";

import { Link, useLocation } from "react-router-dom";

import { LinkObject } from "Data/sublinks";

interface NavLinkProps {
  data: LinkObject;
  displaySubmenu: () => void;
}

export default function NavLink({ data, displaySubmenu }: NavLinkProps) {
  const { page, icon, url } = data;
  const location = useLocation();

  const listItemClasses = classNames({
    "navbar__list-item": true,
    "navbar__list-item--active":
      location.pathname.includes(url) && url !== "/ref-helper/"
        ? true
        : location.pathname === url,
  });

  return (
    <li className={listItemClasses} onMouseOver={displaySubmenu}>
      <Link className="navbar__link" to={url}>
        {icon}
        {page}
      </Link>
    </li>
  );
}
