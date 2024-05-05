import React from "react";
import "./Style/App.css"
import ML_module from "./Component/ML_module";

function App() {
  return (
    <div className="App">
      <h1 className="Project-title" style={{ margin: 0 }}>
        Eye Disease Detection
      </h1>
     <ML_module />
    </div>
  );
}

export default App;
