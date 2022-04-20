import links from "../Data/sublinks";

export default function findCurrentModeInLinks(mode) {
    return links.find(obj => obj.modes[mode]).modes[mode];
  };
  