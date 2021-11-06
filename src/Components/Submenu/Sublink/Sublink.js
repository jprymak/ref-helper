import classNames from "classnames";

import {Link} from "react-router-dom";

function Sublink({active, handleSublinkClick, id, name, url}) {
    const classes = classNames({
        "sublinks__sublink":true,
        "sublinks__sublink--active": active
    });
    return (
        <li className={classes}>
            <Link 
        onClick={() => handleSublinkClick(id)} to={url}>{name}</Link>
        </li>
    );
}

export default Sublink;