import React from 'react';

const scorebarStyles = {
  margin: "1rem"
};

const colourForTeam = (team) => ({
  red: "#CD3B49",
  blue: "#80C2FF"
}[team.toLowerCase()]);

const addStyles = (more = {}) => Object.assign({}, scorebarStyles, more)

const Scorebar = ({
  activeTeam,
  classValue,
  score,
  total,
  team,
  players,
  spymaster
}) => (
  <div className={classValue} style={addStyles()}>
    <div style={{border: `2px solid ${colourForTeam(team)}`, borderRadius: "20px"}}>
      <p>Score</p>
      <p>{`${score} / ${total}`}</p>
    </div>

    <p style={{color: colourForTeam(team)}}>
      {team}{activeTeam === team ? " (active)" : ""}
    </p>

    <div>
      <p style={{color: colourForTeam(team)}}>Players</p>
      {players.map((player, idx) => <p key={idx}>{player}</p>)}
    </div>

    <p style={{color: colourForTeam(team)}}>Spymaster</p>
    <p>{spymaster}</p>
  </div>
);

export default Scorebar;
