import { useGlobalContext } from "../context";

export default function Projects(props){

const {closeSubmenu} = useGlobalContext();
const {name} = props;
    return <div onMouseOver={closeSubmenu} className="mode"><h1>{name}</h1></div>;
}