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
  const more = {
   // hack for lining up the top of the boxes */
   position: 'relative',
   top: -41
  };
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
  borderRadius: "10px",
  padding: "10px",
  // color: activeTeam === team && "white",
  // background: activeTeam === team && colourForTeam(team),
  // fontWeight: activeTeam === team && "bold"
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
      <p className="p-0 mb-0" style={{color: colours.darkGrey}}>Score</p>
      <h3 className="p-0 my-0" style={{position: 'relative', top: -6, fontWeight: 'normal'}}>{`${score}/${total}`}</h3>
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
