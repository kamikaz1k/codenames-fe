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

import dummyData from './lib/dummy';

window.inspect = (obj) => {
  console.log(obj);
  return obj;
}

class App extends React.Component {

  state = Object.assign({
    userId: null,
    roomId: null,
    roomName: "",
    team: null,
    words: [],
    state: null,
    losingTeam: null,
    activeTeam: "red",
    redTeamScore: 0,
    redTeamTotalCards: 0,
    blueTeamScore: 0,
    blueTeamTotalCards: 0,
    username: ""
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
    this.setState({ roomId, roomName });
    // roomId = roomId || window.prompt("Room ID please?");

    // this.state.channel.push("join_room", {room: parseInt(roomId)});
  }

  handleNewGame = () => {
    this.state.channel.push("create_game");
  }

  handleTeamSelection = (team) => {
    this.state.channel.push("pick_team", { team });
  }

  handleGameAction = (cardId) => {
    this.state.channel.push("game_action", {action: "select", id: cardId});
  }

  handleSelectWord = (word, activeTeam) => {
    word.isRevealed || this.handleGameAction(word.id);
  }

  handleUsernameChange = (e) => {
    console.log("handleUsernameChange", e);
  }

  handleCreateRoom = (roomName) => {
    console.log("handleCreateRoom", roomName);
    setTimeout(() => {
      const roomId = "RANDOM";
      console.log("mocking async room creation", roomId);
      this.setState({ roomId });
    }, 1000);
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
            <div>set up player</div>
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
