import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavBar } from "./Components/NavBar";
import { Home, FastCalc, Projects } from "./Pages";
import { Submenu } from "./Components/Submenu";
import { Sidebar } from "Components/Sidebar";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <NavBar />
        <Sidebar />
        <Routes>
          <Route path="/ref-helper/fast-calc/:mode" element={<FastCalc />} />
          <Route path="/ref-helper/projects/:mode" element={<Projects />} />
          <Route path="/ref-helper/" element={<Home />} />
        </Routes>
        <Submenu />
      </Router>
    </>
  );
}

export default App;
