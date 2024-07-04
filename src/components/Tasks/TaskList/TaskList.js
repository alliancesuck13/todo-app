/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import Task from '../Task';
import './TaskList.css';

class TaskList extends React.Component {
  render() {
    const { todoList, onTaskDeleted, onTaskCompleted, onTaskEdited, handleEditTask } =
      this.props;

    const todoItems = todoList.map((item) => {
      let taskClassName = '';
      if (item.isActive) taskClassName = '';
      if (item.isActive && item.isEditing) taskClassName = ' editing';
      if (!item.isActive) taskClassName = 'completed';

      return (
        <li className={taskClassName} key={item.id}>
          <Task
            content={item.content}
            creationDate={item.creationDate}
            isChecked={!item.isActive}
            onDelete={() => onTaskDeleted(item.id)}
            onDeleteCompletedTasks={() => onTaskCompleted(item.id)}
            onComplete={() => onTaskCompleted(item.id)}
            onEdit={(text) => onTaskEdited.call(this, item.id, text)}
            handleEditTask={() => handleEditTask(item.id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{todoItems}</ul>;
  }
}

export default TaskList;
