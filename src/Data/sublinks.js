
import { FaFolder, FaCalculator, FaHome } from "react-icons/fa";

const links = [
  {
    id: 0,
    page: "home",
    url: "/ref-helper/",
    icon:  <FaHome className="navbar__icon"/>,
  },
  {
    id: 1,
    page: "fast calc",
    url: "/ref-helper/fast-calc",
    icon: <FaCalculator className="navbar__icon" />,
    modes: {
      "calc-1": {
        id: "calc-1",
        url: "/ref-helper/fast-calc/calc-1",
        name: "Select Pipe By Capacity",
        info: ["pipe", "flow", "velocity", "pressureDrop"],
        inputs: ["capacity", "delta", "medium", "allowedPressureDrop", "allowedVelocity"]
      },
      "calc-2": {
        id: "calc-2",
        url: "/ref-helper/fast-calc/calc-2",
        name: "Select Pipe By Flow",
        info: ["pipe", "velocity", "pressureDrop"],
        inputs: ["flow", "medium", "allowedPressureDrop", "allowedVelocity"],
      },
      "calc-3": {
        id: "calc-3",
        url: "/ref-helper/fast-calc/calc-3",
        name: "Calculate flow",
        info: ["flow"],
        inputs: ["capacity", "delta", "medium"]
      }
    },
  },
  {
    id: 2,
    page: "projects",
    url: "/ref-helper/projects",
    icon: <FaFolder className="navbar__icon" />,
    modes: {
      "projects-1": {
        id: "projects-1",
        name: "New project",
        url: "/ref-helper/projects/projects-1",
      },
      "projects-2": {
        id: "projects-2",
        name: "Browse Projects",
        url: "/ref-helper/projects/projects-2",
      },
    },
  },
];

export default links;