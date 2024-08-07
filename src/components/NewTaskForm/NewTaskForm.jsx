import { Component, useState } from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

Component.propTypes = {
  onTaskAdded: PropTypes.func,
};

Component.defaultProps = {
  onTaskAdded: () => {
    throw new TypeError("Отсутствует prop добавления Task в NewTaskForm");
  },
};

export default function NewTaskForm({ onTaskAdded }) {
  const [state, setState] = useState({
    taskValue: "",
    minutesValue: "",
    secondsValue: "",
  });
  const placeholder = "What needs to be done?";

  const onSubmitTask = (e) => {
    e.preventDefault();

    let minutes =
      +state.minutesValue >= 60
        ? (state.minutesValue = "59") && (state.secondsValue = "59")
        : state.minutesValue;
    const seconds =
      +state.secondsValue >= 3600
        ? (minutes = "59") && (state.secondsValue = "59")
        : state.secondsValue;

    let time = new Date(0, 0, 0, 0, minutes, seconds);
    if (minutes === "") time = new Date(0, 0, 0, 0, 0, seconds);
    if (seconds === "") time = new Date(0, 0, 0, 0, minutes, 0);
    if (minutes === "" && seconds === "") time = new Date(0, 0, 0, 0, 0, 0);

    if (
      !state.taskValue.length ||
      (!state.minutesValue.length && !state.secondsValue.length)
    ) {
      return;
    }

    onTaskAdded(state.taskValue, time);

    setState({ taskValue: "", minutesValue: "", secondsValue: "" });
  };

  const onChangeTaskValue = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    setState((prevState) => ({ ...prevState, taskValue: e.target.value }));
  };

  const onChangeMinutes = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    if (e.target.value.match(/^\d+$/) || e.target.value === "") {
      setState((prevState) => ({ ...prevState, minutesValue: e.target.value }));
    }
  };

  const onChangeSeconds = (e) => {
    if (e.target.value.match(/^[ ]+$/)) return;
    if (e.target.value.match(/^\d+$/) || e.target.value === "") {
      setState((prevState) => ({ ...prevState, secondsValue: e.target.value }));
    }
  };

  return (
    <header className="header">
      <h1>Todo App</h1>
      <form className="new-todo-form" onSubmit={onSubmitTask}>
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={onChangeTaskValue}
          type="text"
          value={state.taskValue}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onChangeMinutes}
          type="text"
          value={state.minutesValue}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onChangeSeconds}
          type="text"
          value={state.secondsValue}
        />
        <button type="submit"></button>
      </form>
    </header>
  );
}
