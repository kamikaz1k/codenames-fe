import React from 'react';
import {
  Link
} from "react-router-dom";

import WinnerModal from '../components/WinnerModal';
import Gameboard from '../components/Gameboard';


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
  showWinnerModal,
  team,
  timerStartedAt,
  userId,
  username,
  words,
  handleCloseWinnerModal,
  handleNewRoom,
  handleJoinRoom,
  handleNewGame,
  handleTeamSelection,
  handleGameAction,
  handleSelectWord,
  handleStartTimer,
  handleEndTurn,
  handleUpdatePlayer,
  setShowColours
}) => (
  <div className="text-center">
    <Link to="/"><h1>C O D E N A M E S</h1></Link>

    <div className={`mx-3 text-${gameState === 'started' ? 'left' : 'right'}`}>
      <button className="btn btn-secondary" onClick={() => handleNewGame()}>New Game</button>
    </div>

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
      handleStartTimer={handleStartTimer}
      handleUpdatePlayer={handleUpdatePlayer}
      words={words.map(w => ({ ...w, isRevealed: showColours ? true : w.isRevealed }))}
      role={role}
      setShowColours={setShowColours}
      timerStartedAt={timerStartedAt}
      showColours={showColours}
      userId={userId}
      username={username} />

    <WinnerModal
      isOpen={showWinnerModal}
      closeModal={() => handleCloseWinnerModal()}
      handleNewGame={handleNewGame}
      losingTeam={losingTeam}
      winningTeam={losingTeam === "red" ? "blue" : "red"} />
  </div>
);

export default Game;
