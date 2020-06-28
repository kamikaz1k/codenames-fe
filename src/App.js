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

window.inspect = (obj) => {
  console.log(obj);
  return obj;
}

const MOCK_BACKEND = true;
const RED_TEAM = "red";
const BLUE_TEAM = "blue";

class App extends React.Component {

  state = Object.assign({
    userId: null,
    username: "",
    roomId: null,
    roomName: "",
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
  }, dummyData)

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
    const socket = new Socket("//localhost:4000/socket", {params: {userToken: "123"}});
    socket.connect();

    const channel = socket.channel("room:lobby");

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
      console.log(`[${Date()}] ${JSON.stringify(payload.body)}`);

      const {
        team,
        room_id,
        user_id
      } = payload.body;

      this.setState({
        userId: user_id,
        roomId: room_id,
        team: team
      })
    });

    channel.on("game_update", payload => {
      // console.log(`[${Date()}] ${JSON.stringify(payload.body)}`);
      console.log(`[${Date()}] GAME UPDATE`);

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

    channel.join()
      .receive("ok", ({messages}) => console.log("catching up", messages) )
      .receive("error", ({reason}) => console.log("failed join", reason) )
      .receive("timeout", () => console.log("Networking issue. Still waiting..."));

    this.setState({
      channel, socket
    });

    window.channel = channel;
    window.socket = socket;

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

    roomId = roomId || window.prompt("Room ID please?");
    this.state.channel.push("join_room", {room: parseInt(roomId)});
  }

  handleNewGame = () => {
    if (MOCK_BACKEND) return this.setState({ ...dummyData });
    this.state.channel.push("create_game");
  }

  handleTeamSelection = (team) => {
    if (MOCK_BACKEND) return this.setState({ team });
    this.state.channel.push("pick_team", { team });
  }

  handleGameAction = (cardId) => {
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
    word.isRevealed || this.handleGameAction(word.id);
  }

  handleUpdatePlayer = ({ userId = 901, username, team, role }) => {
    console.log("handleUpdatePlayer", { username, team, role });

    if (MOCK_BACKEND) return this.setState({ userId, username, team, role });
  }

  handleCreateRoom = (roomName) => {
    console.log("handleCreateRoom", roomName);
    setTimeout(() => {
      const roomId = "RANDOM";
      console.log("mocking async room creation", roomId, roomName);
      this.setState({ roomId, roomName });
    }, 200);
  }

  render() {
    return (
      <Router>
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
            <GamePage
              state={this.state}
              handleNewRoom={this.handleNewRoom}
              handleJoinRoom={this.handleJoinRoom}
              handleNewGame={this.handleNewGame}
              handleTeamSelection={this.handleTeamSelection}
              handleGameAction={this.handleGameAction}
              handleSelectWord={this.handleSelectWord}
            />
          </Route>

          <Route>
            <div>dont come here</div>
            <Link to="/create-room">create-room</Link>
            <Link to="/game">game</Link>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
