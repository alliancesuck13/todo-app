import { Component } from "react";
import PropTypes from "prop-types";

import TaskFilter from "./TaskFilter";
import "./Footer.css";

Component.propTypes = {
  todoListCount: PropTypes.number,
  handleClearCompleted: PropTypes.func,
  handleRenderAllTasks: PropTypes.func,
  handleRenderCompletedTasks: PropTypes.func,
  handleRenderActiveTasks: PropTypes.func,
  filter: PropTypes.string,
};

Component.defaultProps = {
  todoListCount: 3,
  handleClearCompleted: () => {
    throw new TypeError(`Отсутствует prop handleClearCompleted в ${this}`);
  },
  handleRenderAllTasks: () => {
    throw new TypeError(`Отсутствует prop handleRenderAllTasks в ${this}`);
  },
  handleRenderCompletedTasks: () => {
    throw new TypeError(`Отсутствует prop handleRenderCompletedTasks в ${this}`);
  },
  handleRenderActiveTasks: () => {
    throw new TypeError(`Отсутствует prop handleRenderActiveTasks в ${this}`);
  },
  filter: "",
};

export default function Footer({
  todoListCount,
  handleClearCompleted,
  handleRenderAllTasks,
  handleRenderCompletedTasks,
  handleRenderActiveTasks,
  filter,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoListCount} tasks left</span>
      <TaskFilter
        handleRenderAllTasks={handleRenderAllTasks}
        handleRenderCompletedTasks={handleRenderCompletedTasks}
        handleRenderActiveTasks={handleRenderActiveTasks}
        filter={filter}
      />
      <button
        className="clear-completed"
        type="button"
        onClick={() => handleClearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
}
