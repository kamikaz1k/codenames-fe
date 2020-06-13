import React from 'react';

const cardStyles = {
  border: "2px black solid"
};

const colourForTeam = (team) => ({
  red: "#CD3B49",
  blue: "#80C2FF"
}[team.toLowerCase()]);

const prepareCardStyle = (word) => {
  let teamStyles = {};
  if (word.isRevealed) {
    teamStyles.color = colourForTeam(word.team);
  }
  console.log(teamStyles);
  return Object.assign({}, cardStyles, teamStyles);
}

const Card = ({ classValue, handleSelectWord, word }) => (
  <div
    onClick={() => handleSelectWord(word)}
    className={classValue}
    style={prepareCardStyle(word)}
  >
    <p>{word.value}</p>
  </div>
);

export default Card;
