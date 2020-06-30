import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import { Socket } from 'phoenix';

// import logo from './logo.svg';
import './App.css';
import GamePage from './pages/game';
import CreateRoomPage from './pages/create-room';
import ShareRoomPage from './pages/ShareRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import SetupPlayerPage from './pages/SetupPlayerPage';

import dummyData from './lib/dummy';
import packageJson from '../package.json';

window.inspect = (obj) => {
  console.log(obj);
  return obj;
}

const BACKEND_URL = process.env.BACKEND_URL || "//localhost:4000";
console.log(BACKEND_URL);
// const BACKEND_URL = "//spymanz-be.herokuapp.com";
const DEBUG = true;
const MOCK_BACKEND = false;
const BASENAME = packageJson.homepage;
const RED_TEAM = "red";
const BLUE_TEAM = "blue";
const LOBBY = "room:lobby"

class App extends React.Component {

  state = Object.assign({
    userId: null,
    username: "",
    roomId: null,
    roomName: "ROOM NAME!",
    room: {},
    team: null,
    role: null,
    words: [],
    state: null,
    losingTeam: null,
    activeTeam: "red",
    redTeamScore: 0,
    redTeamTotalCards: 0,
    blueTeamScore: 0,
    blueTeamTotalCards: 0
  }, MOCK_BACKEND ? dummyData : {})

  toast = (msg) => {
    this.setState({ msg: msg });

    setTimeout(() => {
      this.setState(prevState => {
        if (prevState.msg === msg) {
          return {
            ...prevState,
            msg: null
          }
        }

        return msg;
      });
    }, 2000);
  }

  componentDidMount() {
    const socket = new Socket(BACKEND_URL + "/socket"); //, {params: {userToken: "123"}});
    socket.connect();

    const channel = socket.channel(LOBBY);

    channel.on("player_state_update", payload =>{
      console.log(`[${Date()}] ${JSON.stringify(payload.body)}`);

      const {
        room_id,
        user_id
      } = payload.body;

      this.setState({
        userId: user_id,
        roomId: room_id
      });

      if (room_id) {
        channel.leave();
        this.setupRoomChannel(socket, room_id);
      }
    });

    channel.join()
      .receive("ok", ({messages}) => console.log("fetching player_state_update", channel.push("push_player_state")) )
      .receive("error", ({reason}) => console.log("failed join", reason) )
      .receive("timeout", () => console.log("Networking issue. Still waiting..."));

    this.setState({
      channel, socket
    });

    window.channel = channel;
    window.socket = socket;

  }

  setupRoomChannel = (socket, roomId) => {
    console.log(`setting up channel room:${roomId}`);
    const channel = socket.channel(`room:${roomId}`);

    channel.on("new_msg", payload => {
      console.log(`[${Date()}] ${JSON.stringify(payload.body)}`);
    });

    channel.on("player_message", payload => {
      if (payload.error) {
        console.error(`[${Date()}] ${payload.error}`);
        this.toast(payload.error);
      } else {
        console.log(`[${Date()}] ${JSON.stringify(payload)}`);
      }
    });

    channel.on("player_state_update", payload =>{
      console.log(`[${Date()}] player_state_update: ${JSON.stringify(payload.body)}`);

      const {
        team,
        room_id,
        user_id,
        username,
        role
      } = payload.body;

      this.setState({
        userId: user_id,
        roomId: room_id,
        username,
        role,
        team
      });
    });

    channel.on("game_update", payload => {
      console.log(`[${Date()}] GAME UPDATE`, payload.body);

      const {
        active_team,
        words,
        state,
        losing_team,
        blue_total,
        red_total,
        blue_score,
        red_score,
      } = payload.body;

      this.setState({
        words: words,
        activeTeam: active_team,
        redTeamTotalCards: red_total,
        blueTeamTotalCards: blue_total,
        redTeamScore: red_score,
        blueTeamScore: blue_score,
        losingTeam: losing_team,
        state
      });
    });

    channel.on("room_update", payload =>{
      console.log(`[${Date()}] room_update: ${JSON.stringify(payload.room)}`, payload.room);

      const { room = {} } = payload;
      this.setState({ room });
    });

    channel.join()
      .receive("ok", ({messages}) => console.log("fetching player_state_update", channel.push("push_player_state")) )
      .receive("error", ({reason}) => console.log("failed join", reason) )
      .receive("timeout", () => console.log("Networking issue. Still waiting..."));

    this.setState({ channel });
    window.channel = channel;
  }

  _handleClick = () => {
    this.state.channel.push("new_msg", { body: "I was clicked!" });
  }

  handleNewRoom = () => {
    this.state.channel.push("create_room");
  }

  handleJoinRoom = (roomId) => {
    const roomName = "testing room name";

    if (MOCK_BACKEND) return this.setState({ roomId, roomName });

    if (this.state.channel.topic === LOBBY) {
      console.log("closing lobby channel", this.state.channel);
      this.state.channel.leave();

      this.setupRoomChannel(this.state.socket, roomId);
    }
  }

  handleNewGame = () => {
    if (MOCK_BACKEND) return this.setState({ ...dummyData });
    this.state.channel.push("create_game");
  }

  handleTeamSelection = (team) => {
    if (MOCK_BACKEND) return this.setState({ team });
    this.state.channel.push("update_player", { team });
  }

  handleGameAction = (cardId) => {
    console.log("handleGameAction");
    if (this.state.activeTeam !== this.state.team) this.toast("not your team's turn!");

    if (MOCK_BACKEND) return this.clientSideGameAction(cardId);
    this.state.channel.push("game_action", {action: "select", id: cardId});
  }

  clientSideGameAction = (cardId) => {
    if (!MOCK_BACKEND) window.alert("This should not be called...");
    this.setState(prevState => {
      if (prevState.state === "over") return prevState;

      const word = prevState.words.find(w => w.id === cardId);
      let gameState = prevState.state;

      if (word.isRevealed) return prevState;

      if (word.isDoubleAgent) {
        setTimeout(() => window.alert(`${activeTeam} Loses!`), 500);
        gameState = "over";
      }

      const activeTeam = prevState.activeTeam;
      let newActiveTeam = activeTeam;
      if (word.team && word.team !== activeTeam) {
        console.log("### You picked the other team's card!", activeTeam, word);
        newActiveTeam = activeTeam === RED_TEAM ? BLUE_TEAM : RED_TEAM;
      }

      let newState = {
        ...prevState,
        activeTeam: newActiveTeam,
        words: prevState.words.map(w => ({
          ...w,
          isRevealed: w.isRevealed || w.id === cardId
        }))
      };

      return window.inspect({
        ...newState,
        redTeamScore: newState.words.reduce((acc, curr) => (curr.isRevealed && curr.team === RED_TEAM) ? acc + 1 : acc, 0),
        blueTeamScore: newState.words.reduce((acc, curr) => (curr.isRevealed && curr.team === BLUE_TEAM) ? acc + 1 : acc, 0),
        state: gameState,
        activeTeam: newActiveTeam
      });
    });
  }

  handleSelectWord = (word) => {
    console.log("handleSelectWord");
    word.isRevealed || this.handleGameAction(word.id);
  }

  handleUpdatePlayer = ({ username, team, role }) => {
    console.log("handleUpdatePlayer", { username, team, role });

    if (MOCK_BACKEND) return this.setState({ username, team, role });
    this.state.channel.push("update_player", { username, team, role });
  }

  handleCreateRoom = (roomName) => {
    console.log("handleCreateRoom", roomName);
    if (MOCK_BACKEND) return setTimeout(() => {
      const roomId = "RANDOM";
      console.log("mocking async room creation", roomId, roomName);
      this.setState({ roomId, roomName });
    }, 200);

    this.state.channel.push("create_room");
  }

  render() {
    return (
      <Router basename={BASENAME}>
        {DEBUG && <div>Player: {JSON.stringify({ userId: this.state.userId, username: this.state.username, roomId: this.state.roomId, roomName: this.state.roomName, team: this.state.team, role: this.state.role })}</div>}
        <Switch>
          <Route exact path="/">
            <div className="container center">
              <h1>C O D E N A M E S</h1>
              <Link to="/create-room">
                <button className="btn btn-secondary">Create a Room</button>
              </Link>
              <span style={{padding: 5}}></span>
              <Link to="/game">
                <button className="btn btn-secondary">Enter a Room</button>
              </Link>
            </div>
          </Route>

          <Route path="/create-room">
            <CreateRoomPage
              roomId={this.state.roomId}
              roomName={this.state.roomName}
              handleCreateRoom={this.handleCreateRoom} />
          </Route>

          <Route path="/share-room">
            <ShareRoomPage
              roomId={this.state.roomId}
              roomName={this.state.roomName} />
          </Route>

          <Route path="/join-room">
            {this.state.roomId
              ? <Redirect to="/setup-player" />
              : <JoinRoomPage
                  userId={this.state.userId}
                  username={this.state.username}
                  roomId={this.state.roomId}
                  roomName={this.state.roomName}
                  handleJoinRoom={this.handleJoinRoom} />}
          </Route>

          <Route path="/setup-player">
            {!this.state.roomId
              ? <Redirect to="/join-room" />
              : <SetupPlayerPage
                  userId={this.state.userId}
                  username={this.state.username}
                  roomId={this.state.roomId}
                  roomName={this.state.roomName}
                  team={this.state.team}
                  role={this.state.role}
                  handleUpdatePlayer={this.handleUpdatePlayer} />}
          </Route>

          <Route path="/game">
            {!this.state.roomId
              ? <Redirect to="/join-room" />
              : <GamePage
                  state={this.state}
                  handleNewRoom={this.handleNewRoom}
                  handleJoinRoom={this.handleJoinRoom}
                  handleNewGame={this.handleNewGame}
                  handleTeamSelection={this.handleTeamSelection}
                  handleGameAction={this.handleGameAction}
                  handleSelectWord={this.handleSelectWord}
                />}
          </Route>

          <Route>
            <div>dont come here</div>
            <ul>
              <li><Link to="/">Landing</Link></li>
              <li><Link to="/create-room">create-room</Link></li>
              <li><Link to="/game">game</Link></li>
            </ul>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
