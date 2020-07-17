import React from 'react'
import './Timer.css';

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

class Timer extends React.Component {
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
      <div className={`${this.props.classValue} timer-component`}>
        <div className="p-1 pr-4 timer-icon-section">
          <small style={{visibility: timerIsRunning ? 'hidden' : null}}>2:00</small>
          <i className={"icon ion-icon ion-android-stopwatch p-0"} onClick={() => this.props.handleStartTimer()} />
          <small>{timerIsRunning ? 'ON' : 'OFF'}</small>
        </div>
        {timerIsRunning &&
          <div className={"progress-bar-content"}>
            <div className="progress-bar-value">{formatTime(this.state.timeLeft)}</div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${this.state.timeLeft.percentRemaining}%`}} aria-valuenow={this.state.timeLeft.percentRemaining} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
          </div>
        }
      </div>
    );
  }
}

export default Timer;
