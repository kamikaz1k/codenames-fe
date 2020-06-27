import React, { useState } from 'react';
import {
  Redirect
} from "react-router-dom";

const CreateRoomPage = ({
  roomId,
  roomName,
  handleCreateRoom
}) => {
  const [componentRoomName, setRoomname] = useState(roomName);
  return (
    roomId
    ? <Redirect to="share-room" />
    : <div className="create-room-page container container-slim">
      <h1 className="center mb-5">C O D E N A M E S</h1>

      <form>
        <div className="form-group">
          <label htmlFor="roomname">Room name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="roomname"
              aria-describedby="roomnameHelp"
              placeholder="zeekybookydook"
              value={componentRoomName}
              onChange={(e) => setRoomname(e.target.value)}
            />

            <div className="input-group-append">
              <div className="btn btn-primary disabled">Random</div>
            </div>
          </div>
          <small id="roomnameHelp" className="form-text text-muted">minimum of 6 characters</small>
        </div>

        <button
          type="button"
          className={`btn btn-secondary ${componentRoomName ? '' : 'disabled'}`}
          onClick={() => handleCreateRoom(componentRoomName)}>
          Create a Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoomPage;
