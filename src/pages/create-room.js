import React, { useState } from 'react';

const CreateRoomPage = ({
  roomname,
  handleCreateRoom
}) => {
  const [componentRoomname, setRoomname] = useState(roomname);
  return (
    <div className="create-room-page container-sm" style={{maxWidth: 400}}>
      <h1 className="center">C O D E N A M E S</h1>

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
              value={roomname}
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
          className={`btn btn-secondary ${componentRoomname ? '' : 'disabled'}`}
          onClick={() => handleCreateRoom(componentRoomname)}>
          Create a Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoomPage;
