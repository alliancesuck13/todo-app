/* eslint-disable react/prefer-stateless-function */
import React from "react";

import FilterButton from "./FilterButton";
import "./TaskFilter.css";

class TaskFilter extends React.Component {
  render() {
    const {
      handleRenderAllTasks,
      handleRenderCompletedTasks,
      handleRenderActiveTasks,
      filter,
    } = this.props;

    return (
      <ul className="filters">
        <FilterButton
          className={filter === "all" ? "selected" : ""}
          onClick={handleRenderAllTasks}
        >
          All
        </FilterButton>
        <FilterButton
          className={filter === "active" ? "selected" : ""}
          onClick={handleRenderActiveTasks}
        >
          Active
        </FilterButton>
        <FilterButton
          className={filter === "completed" ? "selected" : ""}
          onClick={handleRenderCompletedTasks}
        >
          Completed
        </FilterButton>
      </ul>
    );
  }
}

export default TaskFilter;
