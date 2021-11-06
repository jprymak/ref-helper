import { useGlobalContext } from "context";

export default function Home(){
const {closeSubmenu} = useGlobalContext();
    return (<div onMouseOver={closeSubmenu} className="Home">
        <h1 className="Home__heading">Home</h1>
    <section>
       Welcome! My name is Jakub and I have created this app to help my fellow engineers in their daily tasks. I plan to add many interesting features in the future so stay tuned :)
    </section>
    </div>
    );
}