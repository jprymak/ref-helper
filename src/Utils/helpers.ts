import links from "../Data/sublinks";
import { Mode, LinkObject } from "../Data/sublinks";

export default function findCurrentModeInLinks(mode: string): Mode | undefined {
  const link = links.find((obj) => obj.modes && obj.modes[mode]);
  if(link===undefined || link.modes===undefined) return undefined;
  return link.modes[mode];
}
