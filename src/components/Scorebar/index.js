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

const addComponentStyles = (direction) => {
  const more = {};
  if (direction === "left") {
    more.marginRight = "50%";
  }
  else if (direction === "right") {
    more.marginLeft = "50%";
  }
  return Object.assign({}, scorebarStyles, more || {});
};

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
  direction,
  score,
  total,
  team,
  players,
  spymaster
}) => (
  <div className={classValue} style={addComponentStyles(direction)}>
    <h3 className="mb-2" style={{color: colourForTeam(team), fontWeight: 'bold'}}>
      {prettyTeamName[team]}
    </h3>

    <div style={addScoreBoxStyles({ activeTeam, team })}>
      <p className="p-2">Score</p>
      <p className="pt-4">{`${score} / ${total}`}</p>
    </div>

    <div className="my-4">
      <p style={{color: colourForTeam(team), fontWeight: 'bold', marginBottom: '0.25rem', fontSize: '1.2rem'}}>Players</p>
      <div>
        {players.map((player, idx) =>
          <p className="mb-0" key={idx}>
            <span style={{_display: 'block'}}>
              {player.isYou && <i className="ion-icon ion-record mr-1" style={{color: colourForTeam(team)}} />}
              {player.username || `(id: ${player.user_id})`}
              {player.isYou && " (me)"}
            </span>
          </p>)
        }
      </div>
    </div>

    <p style={{color: colourForTeam(team), fontWeight: 'bold', marginBottom: '0.25rem', fontSize: '1.2rem'}}>Spymaster</p>
    <p>{spymaster}</p>
  </div>
);

export default Scorebar;
