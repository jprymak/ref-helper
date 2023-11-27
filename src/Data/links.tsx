export interface Mode {
  id: string;
  url: string;
  name: string;
  info: string[];
  inputs: string[];
}

const links: Mode[] = [
  {
    id: "calc-1",
    url: "/ref-helper",
    name: "By Flow",
    info: ["flow"],
    inputs: ["flow", "medium", "pipeType"],
  },
  {
    id: "calc-2",
    url: "/ref-helper/calc-2",
    name: "By capacity",
    info: ["flow"],
    inputs: ["capacity", "delta", "medium", "temperature", "pipeType"],
  },
];

export default links;
