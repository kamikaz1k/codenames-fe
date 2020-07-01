import React from 'react';
import colours from '../../utils/colours';

const scorebarStyles = {
  margin: "1rem"
};

const prettyTeamName = {
  red: "Red",
  blue: "Blue"
};

const colourForTeam = (team) => ({
  red: colours.darkRed,
  blue: colours.darkBlue
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
      <p className="p-2">Score</p>
      <p className="pt-4">{`${score} / ${total}`}</p>
    </div>

    <p className="my-4" style={{color: colourForTeam(team), fontWeight: 'bold'}}>
      {prettyTeamName[team]}
    </p>

    <div className="mb-2">
      <h3 style={{color: colourForTeam(team)}}>Players</h3>
      <div>
        {players.map((player, idx) =>
          <p className="mb-0" key={idx}>{player.username || `(${player.user_id}`}</p>)
        }
      </div>
    </div>

    <h3 style={{color: colourForTeam(team)}}>Spymaster</h3>
    <p>{spymaster}</p>
  </div>
);

export default Scorebar;
