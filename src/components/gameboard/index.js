import React from 'react';

import Card from '../card';

const Gameboard = ({ words }) => (
  <div>
    <h1>This is a Gameboard</h1>
    <pre style={{textAlign: "left", marginLeft: "30%"}}>{JSON.stringify(words, null, 2)}</pre>
    {words.map(word => <Card word={word} />)}
  </div>
);

export default Gameboard;
