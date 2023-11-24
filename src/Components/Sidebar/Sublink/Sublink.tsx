import classNames from "classnames";

import { Link, useLocation } from "react-router-dom";

function Sublink({ handleSublinkClick, name, url }) {
  const location = useLocation();
  const classes = classNames({
    sublinks__sublink: true,
    "sublinks__sublink--active": location.pathname.includes(url),
  });
  return (
    <li onClick={handleSublinkClick} className={classes}>
      <Link to={url}>{name}</Link>
    </li>
  );
}

export default Sublink;
