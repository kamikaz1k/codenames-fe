import React from 'react';
import Gameboard from '../components/gameboard';

const Game = ({
  state,
  handleNewRoom,
  handleJoinRoom,
  handleNewGame,
  handleTeamSelection,
  handleGameAction,
  handleSelectWord
}) => (
  <div className="App">
    <button onClick={() => handleNewRoom()}>Sign Into Room</button>
    <button onClick={() => handleJoinRoom()}>Join Room</button>
    <button onClick={() => handleNewGame()}>New Game</button>
    <button onClick={() => handleTeamSelection("red")}>I am red!</button>
    <button onClick={() => handleTeamSelection("blue")}>I am blue!</button>
    <button onClick={() => handleGameAction(2)}>Take action!</button>
    <div>Player State: {JSON.stringify({ userId: state.userId, roomId: state.roomId, team: state.team })}</div>
    <div>Game State: {state.state}</div>
    {state.losingTeam && <div>{state.losingTeam} lost!</div>}
    {state.msg && <div>Error: {state.msg}</div>}
    <Gameboard
      activeTeam={state.activeTeam}
      redTeamScore={state.redTeamScore}
      redTeamTotalCards={state.redTeamTotalCards}
      blueTeamScore={state.blueTeamScore}
      blueTeamTotalCards={state.blueTeamTotalCards}
      handleSelectWord={handleSelectWord}
      words={state.words} />
  </div>
);

export default Game;