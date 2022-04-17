
import { FaFolder, FaCalculator, FaHome } from "react-icons/fa";

const links = [
  // {
  //   id: 0,
  //   page: "home",
  //   url: "/ref-helper/",
  //   icon:  <FaHome className="navbar__icon"/>,
  // },
  {
    id: 1,
    page: "fast calc",
    url: "/ref-helper/fast-calc",
    icon:  <FaCalculator className="navbar__icon"/>,
    modes: [
        {
            id: "calc-1",
            name: "Select Pipe By Flow",
            info: ["pipe","velocity","pressureDrop"],
            inputs: ["flow","allowedPressureDrop","allowedVelocity"],
        },
        {
            id: "calc-2",
            name: "Select Pipe By Capacity",
            info: ["pipe","flow","velocity","pressureDrop"],
            inputs: ["capacity","delta","allowedPressureDrop","allowedVelocity"]
        },
        {
            id: "calc-3",
            name: "Calculate flow",
            info: ["flow"],
            inputs: ["capacity","delta"]
        }
    ],
  },
  {
    id: 2,
    page: "projects",
    url: "/ref-helper/projects",
    icon:  <FaFolder className="navbar__icon"/>,
    modes: [
      {
        id: "projects-1",
        name: "New project",
    },
    {
        id: "projects-2",
        name: "Browse Projects",
    },
    ],
  },
];

export default links;