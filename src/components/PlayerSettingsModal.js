import React, { useState } from 'react';
import Modal from 'react-modal';

import Button from '../components/Button';
import colours from '../utils/colours';

const bgColourForTeam = (team) => ({
  red: colours.red,
  blue: colours.blue,
  null: colours.neutral,
  doubleAgent: "black"
}[team]);

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
    minWidth: '450px',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

const PlayerSettingsModal = ({ closeModal, handleUpdatePlayer, isOpen, player }) => {
  const [componentUsername, setComponentUsername] = useState(player.username);
  const [componentTeam, setComponentTeam] = useState(player.yourTeam);
  const [componentRole, setComponentRole] = useState(player.role);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={`Player Settings`}
    >
      <div className="mt-4">
        <h1>Player Settings</h1>
      </div>

      <div className="form">
        <div className="form-group">
          <label htmlFor="username">Nickname</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Captain Falcon"
              value={componentUsername}
              onChange={(e) => setComponentUsername(e.target.value)}
              required
              autoComplete="nope"
              autoFocus
            />
          </div>
          <small id="usernameHelp" className="form-text text-muted">Up to 12 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="team">Team</label>
          <div className="row" style={{marginRight: 0, marginLeft: 0}}>
            <button
              className="btn btn-secondary col"
              style={{
                height: 50,
                borderColor: componentTeam === "red" ? bgColourForTeam("red") : null,
                backgroundColor: componentTeam === "red" ? bgColourForTeam("red") : null
              }}
              onClick={() => setComponentTeam("red")}>
              Red
            </button>
            <span style={{width: 5}}></span>
            <button
              className="btn btn-secondary col"
              style={{
                height: 50,
                borderColor: componentTeam === "blue" ? bgColourForTeam("blue") : null,
                backgroundColor: componentTeam === "blue" ? bgColourForTeam("blue") : null
              }}
              onClick={() => setComponentTeam("blue")}>
              Blue
            </button>
          </div>
        </div>

        {componentTeam && <div className="form-group">
          <label htmlFor="role">Role</label>
          <div className="row" style={{marginRight: 0, marginLeft: 0}}>
            <button
              className="btn btn-secondary col"
              style={{
                height: 50,
                borderColor: componentRole === "spymaster" ? bgColourForTeam(componentTeam) : null,
                backgroundColor: componentRole === "spymaster" ? bgColourForTeam(componentTeam) : null
              }}
              onClick={() => setComponentRole("spymaster")}>
              Spymaster
            </button>
            <span style={{width: 5}}></span>
            <button
              className="btn btn-secondary col"
              style={{
                height: 50,
                borderColor: componentRole === "player" ? bgColourForTeam(componentTeam) : null,
                backgroundColor: componentRole === "player" ? bgColourForTeam(componentTeam) : null
              }}
              onClick={() => setComponentRole("player")}>
              Player
            </button>
          </div>
        </div>}

        <div className="mt-5 mb-4">
          <Button
            type="yellowOrange"
            style={{fontWeight: 'normal', height: 50, width: 100}}
            className="btn btn-secondary mx-1"
            disabled={!(componentUsername && componentTeam && componentRole)}
            onClick={() => {
              handleUpdatePlayer({
                username: componentUsername,
                team: componentTeam,
                role: componentRole
              });
              closeModal();
            }}>
            Update
          </Button>

          <Button className="btn btn-secondary mx-1" style={{fontWeight: 'normal', height: 50, width: 100}} onClick={() => closeModal()}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerSettingsModal;
