import generateUniqueID from "../../TodoApp/utils/generateUniqueID";

import "./TaskFilter.css";

export default function TaskFilter({
  handleRenderAllTasks,
  handleRenderCompletedTasks,
  handleRenderActiveTasks,
  filter,
}) {
  return (
    <ul className="filters">
      <li key={generateUniqueID()}>
        <button
          type="button"
          onClick={handleRenderAllTasks}
          className={filter === "all" ? "selected" : ""}
        >
          All
        </button>
      </li>
      <li key={generateUniqueID()}>
        <button
          type="button"
          onClick={handleRenderActiveTasks}
          className={filter === "active" ? "selected" : ""}
        >
          Active
        </button>
      </li>
      <li key={generateUniqueID()}>
        <button
          type="button"
          onClick={handleRenderCompletedTasks}
          className={filter === "completed" ? "selected" : ""}
        >
          Completed
        </button>
      </li>
      {/* <FilterButton
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
      </FilterButton> */}
    </ul>
  );
}
