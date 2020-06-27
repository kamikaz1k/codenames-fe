import React, { useState } from 'react';
import {
  useLocation
} from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const JoinRoomPage = ({
  userId,
  username,
  roomId,
  roomName,
  handleJoinRoom
}) => {
  const queryRoomId = useQuery().get("roomId") || "";
  const [componentRoomId, setComponentRoomId] = useState(queryRoomId);

  return (
    <div className="join-room-page container container-slim">
      <h1 className="center mb-5">C O D E N A M E S</h1>

      <form onSubmit={e => e.preventDefault() || handleJoinRoom(componentRoomId)}>
        <div className="form-group">
          <label htmlFor="room-id">Room ID</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="room-id"
              aria-describedby="roomJoinHelp"
              placeholder="90210"
              value={componentRoomId}
              disabled={roomId && (roomId === componentRoomId)}
              onChange={(e) => setComponentRoomId(e.target.value)}
              required
              autocomplete="false"
            />
          </div>
          <small id="roomJoinHelp" className="form-text text-muted">Type in the Room ID</small>
        </div>

        <button
          type="button"
          className={`btn btn-secondary ${componentRoomId ? '' : 'disabled'}`}
          onClick={() => componentRoomId && handleJoinRoom(componentRoomId)}>
          Join Room #{componentRoomId}
        </button>
      </form>
    </div>
  );
}

export default JoinRoomPage;
