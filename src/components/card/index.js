import React from 'react';

const cardStyles = {
  border: "2px black solid"
};

const Card = ({ classValue, word, visible = false }) => (
  <div className={classValue} style={cardStyles}>
    <p>{word}</p>
  </div>
);

export default Card;
