/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

import "./NewTaskForm.css";
// import TaskTimer from "./TaskTimer";

class NewTaskForm extends React.Component {
  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  static defaultProps = {
    onTaskAdded: () => {
      throw new TypeError(`Отсутствует prop добавления Task в ${this}`);
    },
  };

  constructor() {
    super();

    this.state = {
      taskValue: "",
      minutesValue: "0",
      secondsValue: "0",
    };
  }

  onSubmitTask = (e) => {
    const { onTaskAdded } = this.props;
    const { taskValue } = this.state;
    let { minutesValue, secondsValue } = this.state;

    e.preventDefault();

    let minutes =
      +minutesValue >= 60 ? (minutesValue = "59") && (secondsValue = "59") : minutesValue;
    const seconds =
      +secondsValue >= 3600 ? (minutes = "59") && (secondsValue = "59") : secondsValue;

    const time = format(new Date(0, 0, 0, 0, minutes, seconds), "mm:ss");

    if (taskValue.length) onTaskAdded(taskValue, time);

    this.setState({ taskValue: "" });
  };

  onChangeTaskValue = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    this.setState({ taskValue: e.target.value });
  };

  onChangeMinutes = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    if (!e.target.value.match(/^\d+$/)) return;

    this.setState({ minutesValue: e.target.value });
  };

  onChangeSeconds = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    if (!e.target.value.match(/^\d+$/)) return;

    this.setState({ secondsValue: e.target.value });
  };

  render() {
    const { taskValue } = this.state;
    const placeholder = "What needs to be done?";

    return (
      <header className="header">
        <h1>Todo App</h1>
        <form className="new-todo-form" onSubmit={this.onSubmitTask}>
          <input
            className="new-todo"
            placeholder={placeholder}
            onChange={this.onChangeTaskValue}
            type="text"
            value={taskValue}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onChangeMinutes}
            type="text"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onChangeSeconds}
            type="text"
          />
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
