import React from 'react';
import './Card.css';

const cardStyles = {
  border: "2px black solid"
};

const Card = ({ classValue, word, visible = false }) => (
  <div className={classValue} style={cardStyles}>
    <p>{word}</p>
  </div>
);

export default Card;
