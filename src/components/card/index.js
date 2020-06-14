import React from 'react';

const cardStyles = {
  border: "2px black solid",
  cursor: "pointer"
};

const bgColourForTeam = (team) => ({
  red: "#CD3B49",
  blue: "#80C2FF",
  default: "#FCECD7"
}[team.toLowerCase()]);

const addFontColourForTeam = (team) => (
  team === null ? {} : { color: "white" }
);

const prepareCardStyle = (word) => {
  let teamStyles = {};
  if (word.isRevealed) {
    teamStyles.backgroundColor = bgColourForTeam(word.team || "default");
    Object.assign(teamStyles, addFontColourForTeam(word.team));
  }
  return Object.assign({}, cardStyles, teamStyles);
}

const Card = ({ classValue, handleSelectWord, word }) => (
  <div
    onClick={(e) => e.preventDefault() || handleSelectWord()}
    className={classValue}
    style={prepareCardStyle(word)}
  >
    <p>{word.value}</p>
  </div>
);

export default Card;
