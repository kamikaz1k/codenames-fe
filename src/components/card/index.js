import React from 'react';

const Card = ({ classValue, word }) => (
  <div className={classValue} style={{border: "2px black solid"}}>
    <p>{word}</p>
  </div>
);

export default Card;
