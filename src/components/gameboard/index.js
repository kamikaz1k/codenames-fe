import React from 'react';
import Card from '../card';
import Scorebar from '../scorebar';
import './Gameboard.css'

const Gameboard = ({
  activeTeam,
  handleSelectWord,
  redTeamScore,
  redTeamTotalCards,
  blueTeamScore,
  blueTeamTotalCards,
  words
}) => (
  <div>
    <h1>C O D E N A M E S</h1>
    <div className="wrapper">
      <Scorebar
        activeTeam={activeTeam}
        classValue={"left-sidebar"}
        score={redTeamScore}
        total={redTeamTotalCards}
        team={"Red"}
        players={["shoyu", "scallion", "nori"]}
        spymaster={"chasu"}
        />

      <div className="gameboard">
      {[0, 1, 2, 3, 4].map(i =>
        <div key={i} className="card-row">
          {words.slice(0 + i * 5, 5 + i * 5).map(word =>
            <Card
              key={word.id}
              word={word}
              handleSelectWord={() => handleSelectWord(word, activeTeam)}
              classValue={"card"}
            />
          )}
        </div>
      )}
      </div>

      <Scorebar
        activeTeam={activeTeam}
        classValue={"right-sidebar"}
        score={blueTeamScore}
        total={blueTeamTotalCards}
        team={"Blue"}
        players={["shoyu", "scallion", "nori"]}
        spymaster={"chasu"}
        />
    </div>
  </div>
);

export default Gameboard;
