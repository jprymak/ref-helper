import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {NavBar} from "./Components/NavBar";
import {Home, FastCalc, Projects} from "./Pages";
import { Submenu } from "./Components/Submenu";
import {Sidebar} from "Components/Sidebar";

function App() {
    return (
      <>
      <Router>
        <NavBar/>
        <Sidebar/>
        <Switch>
          <Route path="/ref-helper/fast-calc/:mode">
          <FastCalc/>
            </Route>
            <Route path="/ref-helper/projects/:mode">
          <Projects/>
            </Route>
            {/* <Route path="/ref-helper/">
          <Home />
            </Route> */}
        </Switch>
        <Submenu/>
        </Router>
      </>
    );
}

export default App;
