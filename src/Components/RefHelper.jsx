import React from "react";
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useGlobalContext } from "../context";
import {NavBar} from "./NavBar";
import Projects from "./Projects";
import links from "../Data/sublinks";
import {FastCalc} from "../Components/FastCalc";
import { Submenu } from "./SubMenu";

export function RefHelper() {

  const [currentMode, setCurrentMode] = useState(links[0].modes[0]);

  const handleModeChange=(mode)=>{
    const number = mode.split("-")[1];
    const modeGroup = mode.split("-")[0];
    switch(modeGroup){
      case "calc": setCurrentMode(links[0].modes[number-1]); break;
      case "projects": setCurrentMode(links[1].modes[number-1]);break;
      default: return;
    }
  };
  return (
    <>
    <Router>
      <NavBar currentMode={currentMode}/>
      <Switch>
        <Route path="/ref-helper/fast-calc">
        <FastCalc {...currentMode}/>
          </Route>
          <Route path="/ref-helper/projects">
        <Projects {...currentMode}/>
          </Route>
      </Switch>
      <Submenu onModeChange={handleModeChange} currentMode={currentMode}/>
      </Router>
    </>
  );
}
