import React, { useState, useRef } from 'react';
import {
  Link
} from "react-router-dom";

const shareLink = (roomId) => {
  return `${new URL(window.location.href).origin}/join-room?roomId=${roomId}`
};

const copyLinktoClipboard = (e, linkTextRef, setCopyState) => {
  linkTextRef.current.select();
  document.execCommand('copy');

  e.target.focus();
  setCopyState("Link Copied! ");
};

const ShareRoomPage = ({ roomId, roomName }) => {
  const linkTextRef = useRef(null);
  const [copiedStateMsg, setCopyState] = useState("");

  return (
    <div className="share-room-page container container-slim">
      <h1 className="center mb-5">C O D E N A M E S</h1>
      <div>Your room is ready!</div>

      <div className="input-group mt-4">
        <input
          ref={linkTextRef}
          type="text"
          className="form-control"
          id="roomShare"
          aria-describedby="roomShareHelp"
          value={shareLink(roomId)}
          onChange={e => e.preventDefault()}
        />

        <div className="input-group-append">
          <div className="btn btn-primary" onClick={e => copyLinktoClipboard(e, linkTextRef, setCopyState)}>Copy</div>
        </div>

      </div>
      <small id="roomShareHelp" className="form-text text-muted">{copiedStateMsg + "Share the link with your friends!"}</small>

      <Link to={`/join-room?roomId=${roomId}`}>
        <button type="button" className="btn btn-secondary mt-4">Open Room</button>
      </Link>
    </div>
  );
};

export default ShareRoomPage;