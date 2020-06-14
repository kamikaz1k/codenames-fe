import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Gameboard from './components/gameboard';

const RED_TEAM = "Red";
const BLUE_TEAM = "Blue";

window.inspect = (obj) => {
  console.log(obj);
  return obj;
}

const words = [
  { value: "camp", id: 1, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "deer", id: 2, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "proposal", id: 3, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "walk", id: 4, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "dip", id: 5, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "screw", id: 6, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "denial", id: 7, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "rich", id: 8, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "know", id: 9, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "sheet", id: 10, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "lose", id: 11, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "charm", id: 12, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "pan", id: 13, team: BLUE_TEAM, isDoubleAgent: true, isRevealed: false },
  { value: "researcher", id: 14, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "tight", id: 15, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "adoption", id: 16, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "volcano", id: 17, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "result", id: 18, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "crack", id: 19, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "lemon", id: 20, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "domestic", id: 21, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "aware", id: 22, team: null, isDoubleAgent: false, isRevealed: false },
  { value: "garbage", id: 23, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "lover", id: 24, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  { value: "organize", id: 25, team: null, isDoubleAgent: false, isRevealed: false }
];

class App extends React.Component {

  state = {
    words: words,
    activeTeam: RED_TEAM,
    redTeamScore: 0,
    redTeamTotalCards: words.reduce((acc, curr) => curr.team === RED_TEAM ? acc + 1 : acc, 0),
    blueTeamScore: 0,
    blueTeamTotalCards: words.reduce((acc, curr) => curr.team === BLUE_TEAM ? acc + 1 : acc, 0)
  };

  handleSelectWord = (word, activeTeam) => {
    if (word.isRevealed) return;

    if (activeTeam !== word.team) {
      console.log("### You picked the other team's card!", activeTeam, word);
    }

    this.setState(prevState => {
      let currState = {
        ...prevState,
        words: prevState.words.map(v => {
          if (v.id === word.id) {
            return {
              ...word,
              isRevealed: true
            }
          }

          return v;
        })
      };

      return window.inspect({
        ...currState,
        redTeamScore: currState.words.reduce((acc, curr) => (curr.isRevealed && curr.team === RED_TEAM) ? acc + 1 : acc, 0),
        blueTeamScore: currState.words.reduce((acc, curr) => (curr.isRevealed && curr.team === BLUE_TEAM) ? acc + 1 : acc, 0)
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Gameboard
          activeTeam={this.state.activeTeam}
          redTeamScore={this.state.redTeamScore}
          redTeamTotalCards={this.state.redTeamTotalCards}
          blueTeamScore={this.state.blueTeamScore}
          blueTeamTotalCards={this.state.blueTeamTotalCards}
          handleSelectWord={this.handleSelectWord}
          words={this.state.words} />
      </div>
    );
  }
}

export default App;
