import React from 'react';

const cardStyles = {
  border: "2px black solid",
  cursor: "pointer"
};

const bgColourForTeam = (team) => ({
  Red: "#CD3B49",
  Blue: "#80C2FF",
  null: "#FCECD7",
  doubleAgent: "black"
}[team]);

const addFontColourForBgColour = (colour) => (
  ["#80C2FF", "#FCECD7"].includes(colour) ? {} : { color: "white" }
);

const prepareCardStyle = (word) => {
  let teamStyles = {};
  let doubleAgent = word.isDoubleAgent ? "doubleAgent" : false;

  if (word.isRevealed) {
    const bgColour = bgColourForTeam(doubleAgent || word.team);
    teamStyles.backgroundColor = bgColour;
    Object.assign(teamStyles, addFontColourForBgColour(bgColour));
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
