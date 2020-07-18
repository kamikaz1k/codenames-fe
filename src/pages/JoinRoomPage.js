import React, { useState } from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";

import Button from '../components/Button';
import TitleHeader from '../components/TitleHeader';

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
      <TitleHeader />

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
              autoComplete="nope"
              autoFocus
            />
          </div>
          <small id="roomJoinHelp" className="form-text text-muted">Type in the Room ID</small>
        </div>

        <Button
          type="neutral"
          className={componentRoomId ? '' : 'disabled'}
          onClick={() => componentRoomId && handleJoinRoom(componentRoomId)}>
          Join Room #{componentRoomId}
        </Button>
      </form>
    </div>
  );
}

export default JoinRoomPage;
