import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Link, useLocation } from "react-router-dom";

import type { Mode } from "Data/links";
import { urlMatchCheck } from "Utils/helpers";

interface NavLinkProps {
  data: Mode;
}

export default function NavLink({ data }: NavLinkProps) {
  const { t } = useTranslation();
  const { url, stringPath } = data;
  const location = useLocation();

  const listItemClasses = classNames({
    "navbar__list-item": true,
    "navbar__list-item--active": urlMatchCheck(location.pathname, url),
  });

  return (
    <li className={listItemClasses}>
      <Link className="navbar__link" to={url}>
        {t(stringPath)}
      </Link>
    </li>
  );
}
