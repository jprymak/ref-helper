export interface Mode {
  id: string;
  url: string;
  stringPath: string;
  info: string[];
  inputs: string[];
}

const links: Mode[] = [
  {
    id: "calc-1",
    url: "/ref-helper",
    stringPath: "byV",
    info: ["flow"],
    inputs: ["flow", "medium", "pipeType"],
  },
  {
    id: "calc-2",
    url: "/ref-helper/calc-2",
    stringPath: "byQ",
    info: ["flow"],
    inputs: ["capacity", "delta", "medium", "temperature", "pipeType"],
  },
];

export default links;
