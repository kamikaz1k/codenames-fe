import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Gameboard from './components/gameboard';

const words = [
  { value: "camp", id: 1, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "deer", id: 2, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "proposal", id: 3, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "walk", id: 4, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "dip", id: 5, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "screw", id: 6, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "denial", id: 7, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "rich", id: 8, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "know", id: 9, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "sheet", id: 10, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "lose", id: 11, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "charm", id: 12, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "pan", id: 13, team: "blue", isDoubleAgent: true, isRevealed: false },
  { value: "researcher", id: 14, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "tight", id: 15, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "adoption", id: 16, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "volcano", id: 17, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "result", id: 18, team: "blue", isDoubleAgent: false, isRevealed: false },
  { value: "crack", id: 19, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "lemon", id: 20, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "domestic", id: 21, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "aware", id: 22, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "garbage", id: 23, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "lover", id: 24, team: "red", isDoubleAgent: false, isRevealed: false },
  { value: "organize", id: 25, team: null, isDoubleAgent: false, isRevealed: false }
];

class App extends React.Component {

  state = {
    words: words
  };

  handleSelectWord = (word) => {
    if (word.isRevealed) return;

    this.setState(prevState => {
      return {
        ...prevState,
        words: prevState.words.map(v => {
          if (v.id == word.id) {
            return {
              ...word,
              isRevealed: true
            }
          }

          return v;
        })
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Gameboard handleSelectWord={this.handleSelectWord} words={this.state.words} />
      </div>
    );
  }
}

export default App;
