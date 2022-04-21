import { useGlobalContext } from "context";

import "./index.scss";

export default function Home(){
const {closeSubmenu} = useGlobalContext();
    return (<div onMouseOver={closeSubmenu} className="Home">
        <h1 className="Home__heading">Home</h1>
    </div>
    );
}