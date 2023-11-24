import React from "react";
import { FaFolder, FaCalculator, FaHome } from "react-icons/fa";

export interface LinkObject {
  id: number;
  page: string;
  url: string;
  icon: JSX.Element;
  modes: Mode[];
}

export interface Mode {
  id: string;
  url: string;
  name: string;
  info: string[];
  inputs: string[];
}

const links: LinkObject[] = [
  // {
  //   id: 0,
  //   page: "home",
  //   url: "/ref-helper/",
  //   icon: <FaHome className="navbar__icon" />,
  // },
  {
    id: 1,
    page: "fast calc",
    url: "/ref-helper/fast-calc",
    icon: <FaCalculator className="navbar__icon" />,
    modes: [
      {
        id: "calc-1",
        url: "/ref-helper/fast-calc/calc-1",
        name: "Select Pipe By Capacity",
        info: ["flow"],
        inputs: ["capacity", "delta", "medium", "temperature", "pipeType"],
      },
      {
        id: "calc-2",
        url: "/ref-helper/fast-calc/calc-2",
        name: "Select Pipe By Flow",
        info: ["flow"],
        inputs: ["flow", "medium", "pipeType"],
      },
    ],
  },
  // {
  //   id: 2,
  //   page: "projects",
  //   url: "/ref-helper/projects",
  //   icon: <FaFolder className="navbar__icon" />,
  //   modes: {
  //     "projects-1": {
  //       id: "projects-1",
  //       name: "New project",
  //       url: "/ref-helper/projects/projects-1",
  //     },
  //     "projects-2": {
  //       id: "projects-2",
  //       name: "Browse Projects",
  //       url: "/ref-helper/projects/projects-2",
  //     },
  //   },
  // },
];

export default links;
