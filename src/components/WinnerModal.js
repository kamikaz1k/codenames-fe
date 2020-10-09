import React from 'react';
import Modal from 'react-modal';

import Button from '../components/Button';
import colours from '../utils/colours';

const colourForTeam = (team) => ({
  red: colours.red,
  blue: colours.blue
}[team]);

const prettyTeamName = {
  red: "Red",
  blue: "Blue"
};

const customStyles = {
  content : {
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minHeight: '45%',
    minWidth: '65%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

const WinnerModal = ({ isOpen, closeModal, handleNewGame, losingTeam, winningTeam }) => {
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={() => console.log('afterOpenModal')}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={`Game Over, ${winningTeam} won, ${losingTeam} lost`}
    >
      <div>
        <h1>
          <span style={{color: colourForTeam(winningTeam)}}>{prettyTeamName[winningTeam]}</span> wins!
        </h1>
        <p>And to be clear, <span style={{color: colourForTeam(losingTeam)}}>{losingTeam}</span> lost...</p>
      </div>
      <div className="pt-5">
        <Button type={winningTeam} onClick={() => { closeModal(); handleNewGame(); }}>New Game</Button>
      </div>
    </Modal>
  );
};

export default WinnerModal;
