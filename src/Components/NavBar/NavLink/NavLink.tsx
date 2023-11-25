import classNames from "classnames";

import { Link, useLocation } from "react-router-dom";

import type { Mode } from "Data/links";
import { urlMatchCheck } from "Utils/helpers";

interface NavLinkProps {
  data: Mode;
}

export default function NavLink({ data }: NavLinkProps) {
  const { url, name } = data;
  const location = useLocation();

  const listItemClasses = classNames({
    "navbar__list-item": true,
    "navbar__list-item--active": urlMatchCheck(location.pathname, url),
  });

  return (
    <li className={listItemClasses}>
      <Link className="navbar__link" to={url}>
        {name}
      </Link>
    </li>
  );
}
