import { useParams } from "react-router-dom";
import { useGlobalContext } from "context";

import findCurrentModeInLinks from "../../Utils/helpers";

export default function Projects() {
  const { mode } = useParams();
  const { closeSubmenu } = useGlobalContext();
  const pickedMode = findCurrentModeInLinks(mode);

  return (
    <div onMouseOver={closeSubmenu} className="mode">
      <h1>{pickedMode.name}</h1>
    </div>
  );
}
