import links from "../Data/links";
import { Mode } from "../Data/links";

export default function findCurrentModeInLinks(
  modeToFind: string | undefined
): Mode {
  if (!modeToFind) {
    return links[0];
  }

  for (let mode of links) {
    if (mode.id === modeToFind) {
      return mode;
    }
  }

  return links[0];
}
