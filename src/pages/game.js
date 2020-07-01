import React from 'react';
import Gameboard from '../components/gameboard';

const Game = ({
  activeTeam,
  blueTeamScore,
  blueTeamTotalCards,
  gameState,
  losingTeam,
  redTeamScore,
  redTeamTotalCards,
  role,
  room,
  showColours,
  team,
  words,
  handleNewRoom,
  handleJoinRoom,
  handleNewGame,
  handleTeamSelection,
  handleGameAction,
  handleSelectWord,
  handleEndTurn,
  setShowColours
}) => (
  <div className="App">
    {process.env.NODE_ENV !== "development" && <span><button onClick={() => handleNewRoom()}>Sign Into Room</button>
    <button onClick={() => handleJoinRoom()}>Join Room</button>
    <button onClick={() => handleNewGame()}>New Game</button>
    <button onClick={() => handleTeamSelection("red")}>I am red!</button>
    <button onClick={() => handleTeamSelection("blue")}>I am blue!</button>
    <button onClick={() => handleGameAction(2)}>Take action!</button></span>}
    <button className="btn btn-secondary" onClick={() => handleNewGame()}>New Game</button>
    <Gameboard
      activeTeam={activeTeam}
      yourTeam={team}
      redTeamScore={redTeamScore}
      redTeamTotalCards={redTeamTotalCards}
      blueTeamScore={blueTeamScore}
      blueTeamTotalCards={blueTeamTotalCards}
      players={room.players || []}
      gameState={gameState}
      handleSelectWord={handleSelectWord}
      handleNewGame={handleNewGame}
      handleEndTurn={handleEndTurn}
      words={words.map(w => ({ ...w, isRevealed: showColours ? true : w.isRevealed }))}
      role={role}
      setShowColours={setShowColours}
      showColours={showColours} />
  </div>
);

export default Game;
