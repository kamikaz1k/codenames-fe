import React from 'react'
import './Timer.css';

const timeOut = {
  percentRemaining:0,
  total:0,
  minutes:0,
  seconds:0
};

const getTimeRemaining = (expiresAt, startedAt) => {
  const remainingMilliseconds = expiresAt - Date.now();
  const totalTime = (expiresAt - startedAt);

  return {
    percentRemaining: (Date.now() - startedAt) * 100 / totalTime,
    total: remainingMilliseconds,
    minutes: parseInt(remainingMilliseconds / (60 * 1000)),
    seconds: parseInt(remainingMilliseconds / 1000)
  };
}

const formatTime = ({ minutes, seconds }) => `${minutes}:${("0" + seconds % 60).slice(-2)}`;

class Timer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { timeLeft: getTimeRemaining(props.expiresAt, props.startedAt) }
  }

  // Wait until the component has mounted to start the animation frame
  componentDidMount() {
    this.start()
  }

  // Clean up by cancelling any animation frame previously scheduled
  componentWillUnmount() {
    this.stop()
  }

  start = () => {
    this.frameId = requestAnimationFrame(this.tick)
  }

  tick = () => {
    const timeLeft = getTimeRemaining(this.props.expiresAt, this.props.startedAt);

    if (timeLeft.total <= 0) {
      this.stop()
      this.setState({ timeLeft: timeOut });
      // ...any other actions to do on expiration
    } else {
      this.setState(
        { timeLeft },
        () => setTimeout(() => { this.frameId = requestAnimationFrame(this.tick) }, 1000 / 12)
      )
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  render() {
    return (
      <div className={`${this.props.classValue} timer-component`}>
        <i className={"icon ion-icon ion-android-stopwatch"} />
        <div className={"progress-bar-content"}>
          <div style={{textAlign: "left"}}>{formatTime(this.state.timeLeft)}</div>
          <div className={"progress-bar"}>
            <div className={"background"}></div>
            <div className={"completed"} style={{width: `${this.state.timeLeft.percentRemaining}%`}}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
