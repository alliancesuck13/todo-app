/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { format, formatDistanceToNow } from "date-fns";
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
      timerToDo: null,
      seconds: 0,
    };
  }

  componentDidMount() {
    const { timeToDo } = this.props;

    this.setState({ timerToDo: timeToDo });

    this.timerID = setInterval(() => {
      this.forceUpdate();
    }, 1000);

    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { timerIsStarted } = this.props;
    if (timerIsStarted !== prevProps.timerIsStarted) {
      clearInterval(this.toDoTimerID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.toDoTimerID);
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

  increaseSeconds = () => {
    this.setState((prevState) => {
      return { seconds: prevState.seconds + 1 };
    });
  };

  startTimer = () => {
    const { timeToDo, timerIsStarted } = this.props;
    this.toDoTimerID = setInterval(() => {
      this.increaseSeconds();
      const { timerToDo, seconds } = this.state;
      if (timerIsStarted) {
        if (timeToDo === "00:00") {
          if (timerToDo === "59:59") return;
          const timeToDoArray = timeToDo.split(":");
          const [minutes] = timeToDoArray;
          const time = format(new Date(0, 0, 0, 0, minutes, seconds), "mm:ss");

          this.setState({ timerToDo: time });
        }
      }
    }, 1000);
  };

  render() {
    const {
      content,
      creationDate,
      isChecked,
      onDelete,
      onComplete,
      handleEditTask,
      onStoped,
      onStarted,
    } = this.props;

    const { timerToDo } = this.state;

    const createdAt = formatDistanceToNow(new Date(creationDate), { addSuffix: true });
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
                onClick={onStarted}
              ></button>
              <button
                type="button"
                className="icon icon-pause"
                onClick={onStoped}
              ></button>
              {timerToDo}
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
