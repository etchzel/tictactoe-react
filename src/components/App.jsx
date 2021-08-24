import React from 'react';
import Board from './Board';
import Settings from './Settings';
import Controller from '../modules/controller';
import "./App.jsx.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        moveIndex: 0,
      }],
      stepNumber: 0,
      gameMode: 1,
      playerSign: 'X',
      xIsNext: true,
    };

    this.moveHandler = this.moveHandler.bind(this);
    this.restartHandler = this.restartHandler.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  moveHandler(i) {
    if (!this.state.xIsNext && 
        !this.state.gameMode &&
        !this.state.playerSign === 'X') {
      console.log(this.state);
      return;
    }

    let newState = Controller.moveStep(this.state, i);
    if (!newState) return;

    if (!this.state.gameMode) {
      const aiMove = Controller.aiStep(newState);
      if (aiMove) Object.assign(newState, {...aiMove});
    };

    this.setState(newState);
  }

  updateState(mode, sign) {
    const newState = {
      history: [{
        squares: Array(9).fill(null),
        moveIndex: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      gameMode: mode,
      playerSign: sign
    };

    if (!mode && sign === 'O') {
      const aiMove = Controller.aiStep(newState);
      Object.assign(newState, {...aiMove});
    };

    this.setState(newState);
  }

  restartHandler() {
    this.updateState(this.state.gameMode, this.state.playerSign);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = Controller.checkWin(current.squares);

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (Controller.checkDraw(current.squares)) {
      status = `Draw`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="main">
        <Settings
          gameMode={this.state.gameMode}
          playerSign={this.state.playerSign}
          onChange={this.updateState}
        />
        <div className="main-container">
          <div className="game-info">
            <div className="message current-mode">Current Mode: Vs. {this.state.gameMode ? "Human" : "AI"}</div>
            <div className="message game-message">{status}</div>
          </div>
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.moveHandler(i)}
            />
          </div>
          <div className="options">
            <button 
              className="btn restart-btn"
              onClick={() => this.restartHandler()}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
