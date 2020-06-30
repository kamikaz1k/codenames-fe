import React from 'react';

const scorebarStyles = {
  margin: "1rem"
};

const prettyTeamName = {
  red: "Red",
  blue: "Blue"
};

const colourForTeam = (team) => ({
  red: "#CD3B49",
  blue: "#80C2FF"
}[team.toLowerCase()]);

const addComponentStyles = (more) => Object.assign({}, scorebarStyles, more || {});

const addScoreBoxStyles = ({ activeTeam, team }) => ({
  border: `2px solid ${colourForTeam(team)}`,
  borderRadius: "20px",
  height: "138px",
  color: activeTeam === team && "white",
  background: activeTeam === team && colourForTeam(team),
  fontWeight: activeTeam === team && "bold"
});

const Scorebar = ({
  activeTeam,
  classValue,
  score,
  total,
  team,
  players,
  spymaster
}) => (
  <div className={classValue} style={addComponentStyles()}>
    <div style={addScoreBoxStyles({ activeTeam, team })}>
      <p>Score</p>
      <p>{`${score} / ${total}`}</p>
    </div>

    <p style={{color: colourForTeam(team)}}>
      {prettyTeamName[team]}
    </p>

    <div>
      <p style={{color: colourForTeam(team)}}>Players</p>
      {players.map((player, idx) => <p key={idx}>{player.username || `(${player.user_id}`}</p>)}
    </div>

    <p style={{color: colourForTeam(team)}}>Spymaster</p>
    <p>{spymaster}</p>
  </div>
);

export default Scorebar;
