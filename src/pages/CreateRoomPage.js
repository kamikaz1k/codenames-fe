import React, { useState } from 'react';
import {
  Redirect
} from "react-router-dom";

import Button from '../components/Button';

const chooseRandomly = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomRoomName = () => `${chooseRandomly(roomSynonyms)} for ${chooseRandomly(adjectives)} ${chooseRandomly(nouns)}`;

const adjectives = [
  "wasteful",
  "godly",
  "cheerful",
  "innocent",
  "helpful",
  "unknown",
  "clever",
  "bashful",
  "boring",
  "beautiful",
  "sharp",
  "ethereal"
];

const nouns = [
  "underwear",
  "frogs",
  "vegetable",
  "eggnog",
  "notebook",
  "nation",
  "snake",
  "kitty",
  "cemetery",
  "knowledge",
  "knee",
  "science"
];

const roomSynonyms = [
  "area",
  "place",
  "clearance",
  "compass",
  "expanse",
  "margin",
  "opening",
  "opportunity",
  "play",
  "range",
  "reach",
  "scope",
  "territory",
  "vastness",
  "volume",
  "elbowroom",
  "accommodation",
  "apartment",
  "cabin",
  "cave",
  "chamber",
  "cubicle",
  "den",
  "lodging",
  "office",
  "suite",
  "alcove",
  "cubbyhole",
  "flat",
  "flop",
  "joint",
  "niche",
  "setup",
  "turf",
  "vault"
];

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
              <Button type="neutral" onClick={() => setRoomname(generateRandomRoomName())}>Random</Button>
            </div>
          </div>
          <small id="roomnameHelp" className="form-text text-muted">minimum of 6 characters</small>
        </div>

        <Button
          type="yellowOrange"
          className={componentRoomName ? '' : 'disabled'}
          onClick={() => componentRoomName && handleCreateRoom(componentRoomName)}>
          Create a Room
        </Button>
      </form>
    </div>
  );
}

export default CreateRoomPage;
