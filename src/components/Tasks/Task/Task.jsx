/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { format, formatDistanceToNow, getMinutes, getSeconds, getTime } from "date-fns";
import PropTypes from "prop-types";

import "./Task.css";

class Task extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    creationDate: PropTypes.any, // проверка на такой тип запрещена
    isChecked: PropTypes.bool,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onEdit: PropTypes.func,
    handleEditTask: PropTypes.func,
  };

  static defaultProps = {
    content: "Lorem",
    creationDate: new Date(),
    isChecked: false,
    onDelete: () => {
      throw new TypeError(`Отсутствует prop onDelete в ${this}`);
    },
    onComplete: () => {
      throw new TypeError(`Отсутствует prop onComplete в ${this}`);
    },
    onEdit: () => {
      throw new TypeError(`Отсутствует prop onEdit в ${this}`);
    },
    handleEditTask: () => {
      throw new TypeError(`Отсутствует prop handleEditTask в ${this}`);
    },
  };

  constructor() {
    super();
    this.state = {
      date: getTime(new Date()),
      originDate: getTime(new Date()),
      isStarted: true,
    };
  }

  componentDidMount() {
    const { timeToDo } = this.props;
    this.setState({ date: getTime(timeToDo) });

    if (getTime(timeToDo) === -2209097486000) {
      this.setState({ originDate: getTime(timeToDo) });
    }

    this.timerID = setInterval(() => {
      this.forceUpdate();
    }, 1000);

    this.dateTimer = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.dateTimer);
  }

  keyDown = (e) => {
    const { onEdit, handleEditTask } = this.props;
    if (e.key === "Enter") {
      if (e.target.value.length === 0) return;
      if (e.target.value.match(/^[ ]+$/)) return;
      onEdit(e.target.value);
      handleEditTask();
    }
    if (e.key === "Escape") handleEditTask();
  };

  timer = () => {
    const { setNewTimerTask, timerIsStarted } = this.props;
    const { date, originDate } = this.state;
    let newDate = new Date();

    if (!timerIsStarted) return;

    if (getTime(originDate) === -2209097486000) {
      this.setState({ date: originDate });
      this.setState((prevState) => {
        if (getMinutes(date) === 59 && getSeconds(date) === 59) return null;
        newDate = prevState.date + 1000;
        setNewTimerTask(newDate);

        return {
          date: newDate,
        };
      });
    }

    if (getTime(originDate) !== -2209097486000) {
      this.setState((prevState) => {
        if (getMinutes(date) === 0 && getSeconds(date) === 0) return null;

        newDate = prevState.date - 1000;
        setNewTimerTask(newDate);

        return {
          date: newDate,
        };
      });
    }
  };

  onStart = () => {
    const { onStarted } = this.props;
    const { isStarted } = this.state;

    onStarted();
    this.setState({ isStarted: true });
    if (!isStarted) {
      this.dateTimer = setInterval(this.timer, 1000);
    }
  };

  onStop = () => {
    const { onStoped } = this.props;

    onStoped();
    this.setState({ isStarted: false });
    clearInterval(this.dateTimer);
  };

  render() {
    const { content, creationDate, isChecked, onDelete, onComplete, handleEditTask } =
      this.props;

    const { date } = this.state;

    const createdAt = formatDistanceToNow(new Date(creationDate), { addSuffix: true });
    const timer = format(date, "mm:ss");
    const hide = {};

    if (isChecked) hide.display = "none";
    else hide.display = "";

    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onComplete}
            defaultChecked={isChecked}
          />
          <label>
            <span className="title">{content}</span>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                onClickCapture={this.onStart}
              ></button>
              <button
                type="button"
                className="icon icon-pause"
                onClickCapture={this.onStop}
              ></button>
              {timer}
            </span>
            <span className="description">{createdAt}</span>
          </label>
          <button
            className="icon icon-edit"
            style={hide}
            type="button"
            onClick={handleEditTask}
          ></button>
          <button className="icon icon-destroy" type="button" onClick={onDelete}></button>
        </div>
        <input type="text" className="edit" onKeyDown={this.keyDown} />
      </>
    );
  }
}

export default Task;
