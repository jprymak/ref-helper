import links from "../Data/sublinks";
import { Mode, LinkObject } from "../Data/sublinks";

export default function findCurrentModeInLinks(
  modeToFind: string | undefined
): Mode | null {
  if (!modeToFind) {
    return null;
  }
  let match;
  const link = links.forEach((linkObj) =>
    linkObj.modes.forEach((mode) => {
      if (mode.id === modeToFind) {
        match = mode;
      }
    })
  );

  if (!match) {
    return null;
  }

  return match;
}
