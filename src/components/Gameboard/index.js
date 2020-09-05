import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

import Button from '../Button';
import Card from '../Card';
import Scorebar from '../Scorebar';
import TimerSimple from '../TimerSimple';
import './Gameboard.css'

import colours from '../../utils/colours';

const colourForTeam = (team) => ({
  red: colours.red,
  blue: colours.blue
}[team]);

const prettyTeamName = {
  red: "Red",
  blue: "Blue"
};

const turnIndicatorStyle = (team) => ({
  color: colourForTeam(team),
  marginBottom: 0
})

const Gameboard = ({
  activeTeam,
  gameState,
  handleSelectWord,
  handleNewGame,
  handleEndTurn,
  handleStartTimer,
  handleUpdatePlayer,
  redTeamScore,
  redTeamTotalCards,
  blueTeamScore,
  blueTeamTotalCards,
  players,
  role,
  roomId,
  setShowColours,
  showColours,
  timerStartedAt,
  userId,
  username,
  words,
  yourTeam
}) => {
  const [showSwitchButtons, setShowSwitchButtons] = useState(false);

  return (
    <div className="gameboard-subpage">

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className="game-state-ctrl">
          <button
            style={{minWidth: 145, minHeight: 55}}
            className="btn btn-secondary mx-3 rounded-corner"
            onClick={() => handleNewGame()}
          >
            New Game
          </button>
        </div>

        <div>
          <Link to={`/join-room?roomId=${roomId}`}>
            Link to Room ID: {roomId}
          </Link>
        </div>

        {gameState !== "started" &&
          <div className="game-state-ctrl rounded-corner">
            <button
              style={{minWidth: 145, minHeight: 55}}
              className="btn btn-secondary mx-3"
              onClick={() => handleNewGame()}
            >
              Start Game
            </button>
          </div>
        }
        {gameState === "started" &&
          <div className="game-state-ctrl">
            <button
              className="btn btn-secondary mx-3 rounded-corner"
              style={{visibility: role === "spymaster" ? null : 'hidden', minWidth: 145, minHeight: 55}}
              onClick={() => setShowColours(!showColours)}
            >
              {showColours ? 'Hide Colours' : 'Show Colours'}
            </button>
          </div>
        }
      </div>

      <div className="timer-section-wrapper mt-4">

        <div className="timer-section-container">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <TimerSimple
              className="rounded-corner"
              style={{minWidth: 135}}
              handleStartTimer={handleStartTimer}
              durationText={"2:00"}
              startedAt={timerStartedAt}
              expiresAt={timerStartedAt + (2 * 60 * 1000)} />

            <div>
              <h2 style={turnIndicatorStyle(activeTeam)}>
                {activeTeam === yourTeam ? 'Your Team' : prettyTeamName[activeTeam]}'s Turn
              </h2>
              <div style={{backgroundColor: colourForTeam(activeTeam), width: "100%", height: 25}}></div>
            </div>

            <button
              className="btn btn-secondary rounded-corner"
              style={{minWidth: 135}}
              disabled={activeTeam !== yourTeam}
              onClick={() => handleEndTurn({ activeTeam, team: yourTeam })}
            >
              End Turn
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <Scorebar
          activeTeam={activeTeam}
          direction={"left"}
          classValue={"left-sidebar"}
          score={redTeamScore}
          total={redTeamTotalCards}
          team={"red"}
          players={players.filter(p => p.team === "red" && p.role === "player").map(p => ({ ...p, isYou: p.user_id === userId }))}
          spymaster={players.filter(p => p.team === "red" && p.role === "spymaster").map(p => p.username || p.user_id).join(" and ")}
          />

        <div className="gameboard">
          {[0, 1, 2, 3, 4].map(i =>
            <div key={i} className="card-row">
              {words.slice(0 + i * 5, 5 + i * 5).map(word =>
                <Card
                  key={word.id}
                  word={word}
                  handleSelectWord={() => handleSelectWord(word, activeTeam)}
                  classValue={"card"}
                />
              )}
            </div>
          )}
        </div>

        <Scorebar
          activeTeam={activeTeam}
          direction={"right"}
          classValue={"right-sidebar"}
          score={blueTeamScore}
          total={blueTeamTotalCards}
          team={"blue"}
          players={players.filter(p => p.team === "blue" && p.role === "player").map(p => ({ ...p, isYou: p.user_id === userId }))}
          spymaster={players.filter(p => p.team === "blue" && p.role === "spymaster").map(p => p.username || p.user_id).join(" and ")}
          />
      </div>

      <div className="footer-controls-wrapper mt-5">
        {showSwitchButtons &&
          <span>
            <Button
              bigSize
            onClick={() => handleUpdatePlayer({ team: "red", role: "spymaster", username })}
            type={yourTeam === "red" && role === "spymaster" ? "red" : null}
            className="mr-2"
            >
              Spymaster
            </Button>

            <Button
              bigSize
              onClick={() => handleUpdatePlayer({ team: "red", role: "player", username })}
              type={yourTeam === "red" && role === "player" ? "red" : null}
            >
              Player
            </Button>
          </span>
        }

        <button className="btn btn-clear" onClick={() => setShowSwitchButtons(!showSwitchButtons)}>
          <img alt="switch teams or roles" className="mx-2" src="/switch-logo.svg" />
        </button>

        {showSwitchButtons &&
          <span>
            <Button
              bigSize
              onClick={() => handleUpdatePlayer({ team: "blue", role: "spymaster", username })}
              type={yourTeam === "blue" && role === "spymaster" ? "blue" : null}
              className="mr-2"
            >
              Spymaster
            </Button>

            <Button
              bigSize
              onClick={() => handleUpdatePlayer({ team: "blue", role: "player", username })}
              type={yourTeam === "blue" && role === "player" ? "blue" : null}
            >
              Player
            </Button>
          </span>
        }
      </div>
    </div>
  );
};

export default Gameboard;
