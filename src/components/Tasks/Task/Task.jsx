import { Component, useEffect, useState } from "react";
import { format, formatDistanceToNow, getMinutes, getSeconds } from "date-fns";
import PropTypes from "prop-types";

import "./Task.css";

Component.propTypes = {
  content: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  creationDate: PropTypes.any, // проверка на такой тип запрещена
  isChecked: PropTypes.bool,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  handleEditTask: PropTypes.func,
};

Component.defaultProps = {
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

export default function Task({
  content,
  creationDate,
  isChecked,
  handleEditTask,
  onDelete,
  onComplete,
  onEdit,
  timeToDo,
  onStartTimer,
  onStopTimer,
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => setSeconds((prevSeconds) => prevSeconds + 1), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [seconds]);

  const keyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length === 0) return;
      if (e.target.value.match(/^[ ]+$/)) return;
      onEdit(e.target.value);
      handleEditTask();
    }
    if (e.key === "Escape") handleEditTask();
  };

  const createdAt = formatDistanceToNow(new Date(creationDate), { addSuffix: true });
  const timeIsOver = "Time is over!";
  const formatedTimeToDo =
    getMinutes(timeToDo) === 0 && getSeconds(timeToDo) === 0
      ? timeIsOver
      : format(timeToDo, "mm:ss");
  const checked = isChecked ? true : "";

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onComplete}
          checked={checked}
        />
        <label>
          <span className="title">{content}</span>
          <span className="description">
            {!isChecked ? (
              <>
                <button
                  type="button"
                  className="icon icon-play"
                  onClick={onStartTimer}
                ></button>
                <button
                  type="button"
                  className="icon icon-pause"
                  onClick={onStopTimer}
                ></button>
              </>
            ) : null}
            {formatedTimeToDo}
          </span>
          <span className="description">{createdAt}</span>
        </label>
        {!isChecked ? (
          <button
            className="icon icon-edit"
            type="button"
            onClick={handleEditTask}
          ></button>
        ) : null}
        <button className="icon icon-destroy" type="button" onClick={onDelete}></button>
      </div>
      <input type="text" className="edit" onKeyDown={keyDown} />
    </>
  );
}
