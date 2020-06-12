import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Gameboard from './components/gameboard';

const words = [
  "camp",
  "deer",
  "proposal",
  "walk",
  "dip",
  "screw",
  "denial",
  "rich",
  "know",
  "sheet",
  "lose",
  "charm",
  "pan",
  "researcher",
  "tight",
  "adoption",
  "volcano",
  "result",
  "crack",
  "lemon",
  "domestic",
  "aware",
  "garbage",
  "lover",
  "organize"
];

function App() {
  return (
    <div className="App">
      <Gameboard words={words} />
    </div>
  );
}

export default App;
