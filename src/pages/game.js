import React from 'react';
import Gameboard from '../components/gameboard';

const prettyTeamName = {
  red: "Red",
  blue: "Blue"
};

const Game = ({
  activeTeam,
  blueTeamScore,
  blueTeamTotalCards,
  losingTeam,
  redTeamScore,
  redTeamTotalCards,
  role,
  room,
  gameState,
  showColours,
  words,
  handleNewRoom,
  handleJoinRoom,
  handleNewGame,
  handleTeamSelection,
  handleGameAction,
  handleSelectWord,
  setShowColours
}) => (
  <div className="App">
    <button onClick={() => handleNewRoom()}>Sign Into Room</button>
    <button onClick={() => handleJoinRoom()}>Join Room</button>
    <button onClick={() => handleNewGame()}>New Game</button>
    <button onClick={() => handleTeamSelection("red")}>I am red!</button>
    <button onClick={() => handleTeamSelection("blue")}>I am blue!</button>
    <button onClick={() => handleGameAction(2)}>Take action!</button>
    {role === "spymaster" && <button onClick={() => setShowColours(!showColours)}>{showColours ? 'Show' : 'Hide'} Colours</button>}
    <div>This game has {gameState}</div>
    {losingTeam && <div>{prettyTeamName(losingTeam)} lost!</div>}
    <Gameboard
      activeTeam={activeTeam}
      redTeamScore={redTeamScore}
      redTeamTotalCards={redTeamTotalCards}
      blueTeamScore={blueTeamScore}
      blueTeamTotalCards={blueTeamTotalCards}
      players={room.players || []}
      handleSelectWord={handleSelectWord}
      words={words.map(w => ({ ...w, isRevealed: showColours ? true : w.isRevealed }))}
      showColours={showColours} />
  </div>
);

export default Game;
