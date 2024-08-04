/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

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
      minutesValue: "",
      secondsValue: "",
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

    let time = new Date(0, 0, 0, 0, minutes, seconds);
    if (minutes === "") time = new Date(0, 0, 0, 0, 0, seconds);
    if (seconds === "") time = new Date(0, 0, 0, 0, minutes, 0);
    if (minutes === "" && seconds === "") time = new Date(0, 0, 0, 0, 0, 0);

    if (!taskValue.length || (!minutesValue.length && !secondsValue.length)) return;
    onTaskAdded(taskValue, time);

    this.setState({ taskValue: "", minutesValue: "", secondsValue: "" });
  };

  onChangeTaskValue = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    this.setState({ taskValue: e.target.value });
  };

  onChangeMinutes = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    if (e.target.value.match(/^\d+$/) || e.target.value === "") {
      this.setState({ minutesValue: e.target.value });
    }
  };

  onChangeSeconds = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    if (e.target.value.match(/^\d+$/) || e.target.value === "") {
      this.setState({ secondsValue: e.target.value });
    }
  };

  render() {
    const { taskValue, minutesValue, secondsValue } = this.state;
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
            value={minutesValue}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onChangeSeconds}
            type="text"
            value={secondsValue}
          />
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
