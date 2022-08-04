import React from "react";
import "./control-time-buttons.scss";

const ControlTimeButtons = ({ team, addSeconds }) => {
  return (
    <div className="control_time_buttons">
      <h2>{team}</h2>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, -20);
        }}
      >
        -20
      </button>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, 10);
        }}
      >
        +10
      </button>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, 15);
        }}
      >
        +15
      </button>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, 20);
        }}
      >
        +20
      </button>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, 30);
        }}
      >
        +30
      </button>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, 40);
        }}
      >
        +40
      </button>
      <button
        className="add_time_button"
        onClick={() => {
          addSeconds(team, 50);
        }}
      >
        +50
      </button>
    </div>
  );
};

export default ControlTimeButtons;
