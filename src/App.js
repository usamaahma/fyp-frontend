import "./App.css";
import Routes1 from "./routes";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Routes1 />
      </div>
    </div>
  );
}

export default App;
