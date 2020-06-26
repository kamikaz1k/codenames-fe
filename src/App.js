import React from 'react';
// import logo from './logo.svg';
import './App.css';

import phx from './lib/phoenix';

import Gameboard from './components/gameboard';

const RED_TEAM = "red";
const BLUE_TEAM = "blue";

window.inspect = (obj) => {
  console.log(obj);
  return obj;
}

// window.phx = phx;
// window.Socket = phx.Socket;

const Socket = phx.Socket;

const words = [
  // { value: "__camp", id: 1, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "deer", id: 2, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "proposal", id: 3, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "walk", id: 4, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "dip", id: 5, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "screw", id: 6, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "denial", id: 7, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "rich", id: 8, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "know", id: 9, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "sheet", id: 10, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "lose", id: 11, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "charm", id: 12, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "pan", id: 13, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "researcher", id: 14, team: null, isDoubleAgent: true, isRevealed: false },
  // { value: "tight", id: 15, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "adoption", id: 16, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "volcano", id: 17, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "result", id: 18, team: BLUE_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "crack", id: 19, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "lemon", id: 20, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "domestic", id: 21, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "aware", id: 22, team: null, isDoubleAgent: false, isRevealed: false },
  // { value: "garbage", id: 23, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "lover", id: 24, team: RED_TEAM, isDoubleAgent: false, isRevealed: false },
  // { value: "organize", id: 25, team: null, isDoubleAgent: false, isRevealed: false }
];

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

  componentDidMount() {
    const socket = new Socket("//localhost:4000/socket", {params: {userToken: "123"}});
    socket.connect();

    const channel = socket.channel("room:lobby");

    channel.on("new_msg", payload => {
      console.log(`[${Date()}] ${JSON.stringify(payload.body)}`);
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

    this.state.channel.push("join_room", {room: roomId});
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

    if (word.isRevealed) return;

    return this.handleGameAction(word.id);

    // if (word.isDoubleAgent) {
    //   window.alert(`${activeTeam} Loses!`);
    // }

    // if (activeTeam !== word.team) {
    //   console.log("### You picked the other team's card!", activeTeam, word);
    // }

    // let newActiveTeam = activeTeam;
    // if (word.team && word.team !== activeTeam) {
    //   newActiveTeam = activeTeam === RED_TEAM ? BLUE_TEAM : RED_TEAM;
    // }

    // this.setState(prevState => {
    //   let currState = {
    //     ...prevState,
    //     activeTeam: newActiveTeam,
    //     words: prevState.words.map(v => {
    //       if (v.id === word.id) {
    //         return {
    //           ...word,
    //           isRevealed: true
    //         }
    //       }

    //       return v;
    //     })
    //   };

    //   return window.inspect({
    //     ...currState,
    //     redTeamScore: currState.words.reduce((acc, curr) => (curr.isRevealed && curr.team === RED_TEAM) ? acc + 1 : acc, 0),
    //     blueTeamScore: currState.words.reduce((acc, curr) => (curr.isRevealed && curr.team === BLUE_TEAM) ? acc + 1 : acc, 0)
    //   });
    // });
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
