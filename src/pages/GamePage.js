import React from 'react';
import {
  Link
} from "react-router-dom";

import Gameboard from '../components/Gameboard';
import TitleHeader from '../components/TitleHeader';
import WinnerModal from '../components/WinnerModal';


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
  roomId,
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
    <TitleHeader className="" />

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
      roomId={roomId}
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
