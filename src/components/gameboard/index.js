import React from 'react';
import Card from '../card';
import Scorebar from '../scorebar';
import './Gameboard.css'

const Gameboard = ({ words }) => (
  <div>
    <h1>This is a Gameboard</h1>
    <div className="wrapper">
      <Scorebar
        classValue={"left-sidebar"}
        score={420}
        total={9001}
        team={"Red"}
        players={["shoyu", "scallion", "nori"]}
        spymaster={"chasu"}
        />

      <div className="gameboard">
      {[0, 1, 2, 3, 4].map(i =>
        <div key={i} className="card-row">
          {words.slice(0 + i * 5, 5 + i * 5).map(word =>
            <Card key={i + word} word={word} classValue={"card"} />
          )}
        </div>
      )}
      </div>

      <Scorebar
        classValue={"right-sidebar"}
        score={420}
        total={9001}
        team={"Blue"}
        players={["shoyu", "scallion", "nori"]}
        spymaster={"chasu"}
        />
    </div>
  </div>
);

export default Gameboard;
