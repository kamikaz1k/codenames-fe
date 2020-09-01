import React from 'react'

const timeOut = {
  percentRemaining: 0,
  total: 0,
  minutes: 0,
  seconds: 0
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

class TimerSimple extends React.Component {
  constructor(props) {
    super(props)

    this.state = { timeLeft: getTimeRemaining(props.expiresAt, props.startedAt) }
  }

  // Wait until the component has mounted to start the animation frame
  componentDidMount() {
    this._isMounted = true;
    this.start()
  }

  // Clean up by cancelling any animation frame previously scheduled
  componentWillUnmount() {
    this._isMounted = false;
    this.stop()
  }

  start = () => {
    this.frameId = requestAnimationFrame(this.tick)
  }

  tick = () => {
    if (!this._isMounted) return;

    const timeLeft = getTimeRemaining(this.props.expiresAt, this.props.startedAt);

    const nextTick = () => setTimeout(() => { this.frameId = requestAnimationFrame(this.tick) }, 1000 / 12);

    if (timeLeft.total <= 0) {
      this.setState({ timeLeft: timeOut }, nextTick);
    } else {
      this.setState({ timeLeft }, nextTick);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  render() {
    const timerIsRunning = this.state.timeLeft.percentRemaining > 0;

    return (
      <button
        className="btn btn-secondary"
        style={{fontSize: "1.4rem"}}
        onClick={() => this.props.handleStartTimer()}
      >
        {timerIsRunning && (
          <span>
            <i className="ion-icon ion-android-stopwatch pr-2" style={{fontSize: "1.6rem"}} />
            {formatTime(this.state.timeLeft)}
          </span>
        )}
        {!timerIsRunning && (
          <span>
            <i className="ion-icon ion-android-stopwatch pr-2" style={{fontSize: "1.6rem"}} />
            {this.props.durationText}
          </span>
        )}
      </button>
    );
  }
}

export default TimerSimple;
