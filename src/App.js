import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Socket } from 'phoenix';

import Gameboard from './components/gameboard';

const RED_TEAM = "red";
const BLUE_TEAM = "blue";
const words = [];

window.inspect = (obj) => {
  console.log(obj);
  return obj;
}


class App extends React.Component {

  state = {
    userId: null,
    roomId: null,
    team: null,
    words: words,
    state: null,
    losingTeam: null,
    activeTeam: RED_TEAM,
    redTeamScore: 0,
    redTeamTotalCards: words.reduce((acc, curr) => curr.team === RED_TEAM ? acc + 1 : acc, 0),
    blueTeamScore: 0,
    blueTeamTotalCards: words.reduce((acc, curr) => curr.team === BLUE_TEAM ? acc + 1 : acc, 0)
  };

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

  handleJoinRoom = () => {
    const roomId = window.prompt("Room ID please?");

    this.state.channel.push("join_room", {room: parseInt(roomId)});
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

  render() {
    return (
      <div className="App">
        <button onClick={() => this.handleNewRoom()}>Sign Into Room</button>
        <button onClick={() => this.handleJoinRoom()}>Join Room</button>
        <button onClick={() => this.handleNewGame()}>New Game</button>
        <button onClick={() => this.handleTeamSelection("red")}>I am red!</button>
        <button onClick={() => this.handleTeamSelection("blue")}>I am blue!</button>
        <button onClick={() => this.handleGameAction(2)}>Take action!</button>
        <div>Player State: {JSON.stringify({ userId: this.state.userId, roomId: this.state.roomId, team: this.state.team })}</div>
        <div>Game State: {this.state.state}</div>
        {this.state.losingTeam && <div>{this.state.losingTeam} lost!</div>}
        {this.state.msg && <div>Error: {this.state.msg}</div>}
        <Gameboard
          activeTeam={this.state.activeTeam}
          redTeamScore={this.state.redTeamScore}
          redTeamTotalCards={this.state.redTeamTotalCards}
          blueTeamScore={this.state.blueTeamScore}
          blueTeamTotalCards={this.state.blueTeamTotalCards}
          handleSelectWord={this.handleSelectWord}
          words={this.state.words} />
      </div>
    );
  }
}

export default App;
