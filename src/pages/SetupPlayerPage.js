import React, { useState } from 'react';
import {
  Redirect
} from "react-router-dom";

const bgColourForTeam = (team) => ({
  red: "#CD3B49",
  blue: "#80C2FF",
  null: "#FCECD7",
  doubleAgent: "black"
}[team]);

const SetupPlayerPage = ({
  userId,
  username,
  roomId,
  roomName,
  team,
  role,
  handleUpdatePlayer
}) => {
  const [componentUsername, setComponentUsername] = useState(username || "");
  const [componentTeam, setComponentTeam] = useState(team || "");
  const [componentRole, setComponentRole] = useState(role || "");

  if (userId && username && roomId && team && role) return <Redirect to="/game" />;

  return (
    <div className="setup-player-page container container-slim">
      <h1>C O D E N A M E S</h1>

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
          <small id="teamHelp" className="form-text text-muted">You can change it later</small>
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
          <small id="roleHelp" className="form-text text-muted">You can change it later</small>
        </div>}

        {!componentUsername && componentTeam && componentRole && <div className="mt-5">Don't forget your name!</div>}

        {componentUsername && componentTeam && componentRole &&
          <button
            type="button"
            className={'btn btn-secondary btn-block mt-5'}
            onClick={() => handleUpdatePlayer({
              username: componentUsername,
              team: componentTeam,
              role: componentRole
            })}>
            Join Game
          </button>
        }
      </div>
    </div>
  );
}

export default SetupPlayerPage;
