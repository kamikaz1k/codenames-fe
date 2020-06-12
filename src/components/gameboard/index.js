import React from 'react';
import Card from '../card';
import './Gameboard.css'

const Gameboard = ({ words }) => (
  <div>
    <h1>This is a Gameboard</h1>
    <div className="wrapper">
      <div className="left-sidebar">Sidebar</div>
      <div className="gameboard">
      {[0, 1, 2, 3, 4].map(i =>
        <div key={i} className="card-row">
          {words.slice(0 + i * 5, 5 + i * 5).map(word =>
            <Card key={i + word} word={word} classValue={"card"} />
          )}
        </div>
      )}
      </div>
      <div className="right-sidebar">Sidebar</div>
    </div>
  </div>
);

export default Gameboard;
