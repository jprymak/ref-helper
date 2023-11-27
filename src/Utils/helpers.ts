import links from "../Data/links";
import { Mode } from "../Data/links";

export const findCurrentModeInLinks = (
  modeToFind: string | undefined
): Mode => {
  if (!modeToFind) {
    return links[0];
  }
  
  for (const mode of links) {
    if (mode.id === modeToFind) {
      return mode;
    }
  }
  return links[0];
};

export const getLabelForPipes = (string: string) => {
  const pIndex = string.indexOf("P");
  return `${string.slice(0, 1).toUpperCase()}${string.slice(
    1,
    pIndex
  )} ${string.slice(pIndex)}`;
};

export function truncate(string: string): string {
  if (string.includes(" ")) {
    const stringArray: string[] = string.split(" ");
    stringArray.splice(0, 1, stringArray[0][0] + ".");
    const truncatedString = stringArray.join(" ");
    return truncatedString;
  } else {
    return string;
  }
}

export const urlMatchCheck = (pathname: string, url: string) => {
  if (pathname[pathname.length - 1] === "/") {
    return pathname.slice(0, pathname.length - 1) === url;
  } else return pathname === url;
};
