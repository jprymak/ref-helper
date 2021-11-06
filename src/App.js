import React from "react";
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {NavBar} from "./Components/NavBar";
import links from "./Data/sublinks";
import {Home, FastCalc, Projects} from "./Pages";
import { Submenu } from "./Components/Submenu";
import {Sidebar} from "Components/Sidebar";

function App() {
    const [currentMode, setCurrentMode] = useState(links[1].modes[0]);
    const handleModeChange=(mode)=>{
      if(!mode) return;
      const number = mode.split("-")[1];
      const modeGroup = mode.split("-")[0];
      switch(modeGroup){
        case "calc": setCurrentMode(links[1].modes[number-1]); break;
        case "projects": setCurrentMode(links[2].modes[number-1]);break;
        default: return;
      }
    };
    return (
      <>
      <Router>
        <NavBar onModeChange={handleModeChange}/>
        <Sidebar onModeChange={handleModeChange} currentMode={currentMode}/>
        <Switch>
          <Route path="/ref-helper/fast-calc">
          <FastCalc {...currentMode}/>
            </Route>
            <Route path="/ref-helper/projects">
          <Projects {...currentMode}/>
            </Route>
            <Route path="/ref-helper/">
          <Home />
            </Route>
        </Switch>
        <Submenu onModeChange={handleModeChange} currentMode={currentMode}/>
        </Router>
      </>
    );
}

export default App;
