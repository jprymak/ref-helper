import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavBar } from "./Components/NavBar";
import { FastCalc } from "./Pages";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/ref-helper/:mode?" element={<FastCalc />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
