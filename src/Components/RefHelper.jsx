import React from "react";
import { useState } from "react";

import {NavBar} from "./NavBar";
import fastCalcModes from "../Data/fastCalcModes";
import {FastCalc} from "../Components/FastCalc";

export function RefHelper() {
  const [currentMode, setCurrentMode] = useState(fastCalcModes[1]);

  const handleModeChange=(mode)=>{
    setCurrentMode(fastCalcModes[mode-1]);
  };
console.log(currentMode);
  return (
    <>
      <NavBar onModeChange={handleModeChange} currentMode={currentMode}/>
      <FastCalc {...currentMode}/>
    </>
  );
}
