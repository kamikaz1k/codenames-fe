import React, { useRef, useState } from 'react';
import Modal from 'react-modal';

import Button from '../components/Button';
import colours from '../utils/colours';

const customStyles = {
  content : {
    border: 'none',
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minHeight: '45%',
    maxHeight: '95%',
    minWidth: '450px',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

const defaultWordlistOption = 'default';
const customWordlistOption = 'custom';
const wordlistOptions = [defaultWordlistOption ,'food', 'nsfw', customWordlistOption];

const NewGameModal = ({ closeModal, handleNewGame, isOpen }) => {
  const [activeLabel, setNewActiveLabel] = useState(customWordlistOption);
  const [customWords, updateCustomWords] = useState([]);
  const newWordTextInput = useRef((null));

  const addNewWordAndClearInput = () => {
    if (!newWordTextInput.current.value) return;

    const words = new Set(customWords);
    words.add(newWordTextInput.current.value);
    updateCustomWords([...words]);
    newWordTextInput.current.value = "";
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={`Player Settings`}
    >
      <div className="mt-4">
        <h1>New Game Options</h1>
      </div>

      <p>{`Using "${activeLabel}" wordlist`}</p>

      <div className="btn-group btn-group-toggle">
        {wordlistOptions.map(option =>
          <Button
            className={`btn btn-secondary ${activeLabel === option ? 'active' : ''}`}
            style={{backgroundColor: activeLabel === option ? colours.yellowOrange : colours.neutral, border: 'none' }}
            key={option}
            onClick={() => setNewActiveLabel(option)}
          >
            {option}
          </Button>
        )}
      </div>

      <div className="my-4" style={{visibility: activeLabel === customWordlistOption ? null : 'hidden'}}>
        <h3>{`List of custom words (${customWords.length})`}</h3>
        {customWords.map(word =>
          <Button
            key={word}
            className="my-1 mr-1"
            onClick={() => {
              updateCustomWords(customWords.filter(w => w !== word));
            }}
          >
            {word}
            <i className="ion-icon ion-close pl-2" style={{fontSize: "0.8rem"}} />
          </Button>
        )}

        <div className="input-group mt-2">
          <input
            className="form-control"
            placeholder="Add a new word"
            onKeyPress={e => {
              if (e.key !== "Enter") return;
              addNewWordAndClearInput();
            }}
            ref={newWordTextInput} />
          <div className="input-group-append">
            <Button
              type="neutral"
              onClick={addNewWordAndClearInput}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          className="btn-block"
          type="yellowOrange"
          onClick={() => {
            handleNewGame({ wordlistType: activeLabel, wordlist: customWords })
            closeModal();
          }}
        >
          Start New Game
        </Button>
      </div>
    </Modal>
  );
};

export default NewGameModal;
