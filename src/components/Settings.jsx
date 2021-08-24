import React, { useState } from 'react';
import "./Settings.jsx.css"

function Settings(props) {
  const [state, setState] = useState({
    gameMode: props.gameMode,
    signMode: (props.playerSign === 'X' ? 1 : 0),
  });

  const modeSelectHandler = (mode) => {
    const newState = {
      gameMode: mode,
      signMode: (mode ? 1 : state.signMode)
    };
    setState(newState);
    return newState;
  };

  const signSelectHandler = (mode) => {
    const newState = {signMode: mode};
    setState(newState);
    return newState;
  };

  const handleChange = (states) => {
    props.onChange(
      states.gameMode,
      (states.signMode ? 'X' : 'O')
    )
  };
  
  return (
    <div className="settings">
      <h2 className="message game-mode">Pick game mode:</h2>
      <div className="game-mode-select">
        <button 
          className={
            `btn vs-human ${state.gameMode ? "active" : ""}`
          }
          onClick={() => handleChange(modeSelectHandler(1))}
        >
          Vs. Human
        </button>
        <button 
          className={
            `btn vs-ai ${state.gameMode ? "" : "active"}`
          }
          onClick={() => handleChange(modeSelectHandler(0))}
        >
          Vs. AI
        </button>
      </div>
      <div className={
        `ai-mode-settings ${state.gameMode ? "hidden" : ""}`
        }
      >
        <h2 className="message pick-sign">Choose sign:</h2>
        <div className="sign-select">
          <button 
            className={
              `btn sign-x ${state.signMode ? "active" : ""}`
            }
            onClick={() => handleChange(signSelectHandler(1))}
          >
            X
          </button>
          <button 
            className={
              `btn sign-o ${state.signMode ? "" : "active"}`
            }
            onClick={() => handleChange(signSelectHandler(0))}
          >
            O
          </button>
        </div>
      </div>
    </div>
  );

};

export default Settings;
