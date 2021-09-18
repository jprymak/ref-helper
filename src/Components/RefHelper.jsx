import React from "react";
import { useState } from "react";

import { SelectPipeByFlowMode } from "./SelectPipeByFlowMode";
import { SelectPipeByCapacityMode } from "./SelectPipeByCapacityMode";
import {NavBar} from "./NavBar";

export function RefHelper() {
  const [currentMode, setCurrentMode] = useState("selectByCapacity");

  const handleModeChange =(mode)=>{
    setCurrentMode(mode)
  }

  return (
    <>
      <NavBar onModeChange={handleModeChange}/>
      {
      (()=>{
        switch(currentMode){
          case "selectByFlow": return <SelectPipeByFlowMode />
          case "selectByCapacity": return <SelectPipeByCapacityMode />
        }
      })()
    }
    </>
  )
}
