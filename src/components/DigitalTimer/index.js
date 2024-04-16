// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElipsedInSecond: 0,
  timerLimitInMinute: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreseTimerLimit = () => {
    const {timerLimitInMinute} = this.state

    if (timerLimitInMinute > 1) {
      this.setState(prevState => ({
        timerLimitInMinute: prevState.timerLimitInMinute - 1,
      }))
    }
  }

  onIncreseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinute: prevState.timerLimitInMinute + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinute, timerElipsedInSecond} = this.state
    const isButtonDisabled = timerElipsedInSecond > 0

    return (
      <div className="timer-limit-controle-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controle">
          <button
            className="limit-controle-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreseTimerLimit}
          >
            -
          </button>
          <div className="limit-label-value-container">
            <p className="limit-value">{timerLimitInMinute}</p>
          </div>
          <button
            className="limit-controle-button"
            type="button"
            onClick={this.onIncreseTimerLimit}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSecond = () => {
    const {timerLimitInMinute, timerElipsedInSecond} = this.state
    const isTimerCompeletd = timerElipsedInSecond === timerLimitInMinute * 60

    if (isTimerCompeletd) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElipsedInSecond: prevState.timerElipsedInSecond + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timerElipsedInSecond, timerLimitInMinute} =
      this.state

    const isTimerCompeletd = timerElipsedInSecond === timerLimitInMinute * 60

    if (isTimerCompeletd) {
      this.setState({timerElipsedInSecond: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSecond, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerControle = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const startOrPauseText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controle-container">
        <button
          className="timer-controle-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseText}
            className="timer-controle-icon"
          />
          <p className="timer-controle-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controle-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controle-icon"
          />
          <p className="timer-controle-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondInTimerFormat = () => {
    const {timerLimitInMinute, timerElipsedInSecond} = this.state
    const totalRemaingSeconds = timerLimitInMinute * 60 - timerElipsedInSecond
    const minute = Math.floor(totalRemaingSeconds / 60)
    const second = Math.floor(totalRemaingSeconds % 60)
    const stringfiedInMinutes = minute > 9 ? minute : `0${minute}`
    const stringfiedInSecond = second > 9 ? second : `0${second}`

    return `${stringfiedInMinutes} : ${stringfiedInSecond}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <div className="timer-container">
          <h1 className="title">Digital Timer</h1>
          <div className="digital-timer-container">
            <div className="timer-display-container">
              <div className="elipsed-timer-container">
                <h1 className="elisped-timer">
                  {this.getElapsedSecondInTimerFormat()}
                </h1>
                <p className="timer-state">{labelText}</p>
              </div>
            </div>
            <div className="controle-container">
              {this.renderTimerControle()}
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
