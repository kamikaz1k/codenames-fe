import React from 'react';

import Button from '../Button';
import Card from '../card';
import Scorebar from '../scorebar';
import Timer from '../timer';
import './Gameboard.css'

const colourForTeam = (team) => ({
  red: "#CD3B49",
  blue: "#80C2FF"
}[team]);

const prettyTeamName = {
  red: "Red",
  blue: "Blue"
};

const turnIndicatorStyle = (team) => ({
  color: colourForTeam(team)
})

const Gameboard = ({
  activeTeam,
  gameState,
  handleSelectWord,
  handleNewGame,
  handleEndTurn,
  redTeamScore,
  redTeamTotalCards,
  blueTeamScore,
  blueTeamTotalCards,
  players,
  role,
  setShowColours,
  showColours,
  words,
  yourTeam
}) => (
  <div className="gameboard-subpage">

    <div className={"timer-section-wrapper"}>

      <div className="timer-section-container">
        <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 1rem'}}>
          {gameState === "started" &&
            <button
              className="btn btn-secondary"
              style={{visibility: role === "spymaster" ? null : 'hidden'}}
              onClick={() => setShowColours(!showColours)}
            >
              {showColours ? 'Hide Colours' : 'Show Colours'}
            </button>
          }

          <h2 style={turnIndicatorStyle(activeTeam)}>{activeTeam === yourTeam ? 'Your Team' : prettyTeamName[activeTeam]}'s Turn</h2>

          {gameState === "started" &&
            <button
              className="btn btn-secondary"
              onClick={() => handleEndTurn({ activeTeam, team: yourTeam })}
            >
              End Turn
            </button>
          }
        </div>

        <Timer classValue="mt-4" startedAt={Date.now()} expiresAt={Date.now() + (2 * 60 * 1000)} />
      </div>
    </div>

    <div className="wrapper">
      <Scorebar
        activeTeam={activeTeam}
        classValue={"left-sidebar"}
        score={redTeamScore}
        total={redTeamTotalCards}
        team={"red"}
        players={players.filter(p => p.team === "red")}
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
        classValue={"right-sidebar"}
        score={blueTeamScore}
        total={blueTeamTotalCards}
        team={"blue"}
        players={players.filter(p => p.team === "blue")}
        spymaster={players.filter(p => p.team === "blue" && p.role === "spymaster").map(p => p.username || p.user_id).join(" and ")}
        />
    </div>

    <div className="footer-controls-wrapper mt-5">
      <Button
        type={yourTeam === "red" && role === "spymaster" ? "red" : null}
        className="mr-2"
      >
        Spymaster
      </Button>

      <Button type={yourTeam === "red" && role === "player" ? "red" : null}>
        Player
      </Button>

      <img className="mx-2" src="/switch-logo.svg" />

      <Button
        type={yourTeam === "blue" && role === "spymaster" ? "blue" : null}
        className="mr-2"
      >
        Player
      </Button>

      <Button type={yourTeam === "blue" && role === "player" ? "blue" : null}>
        Spymaster
      </Button>
    </div>
  </div>
);

export default Gameboard;
