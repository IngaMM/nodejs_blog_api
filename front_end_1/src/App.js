import React from "react";
import "./App.css";
import Postlist from "./Postlist";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> My Blog </h1>
      </header>
      <main className="App-main">
        <Postlist />
      </main>
    </div>
  );
}

export default App;
