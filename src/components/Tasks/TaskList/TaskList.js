/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import Task from '../Task';

import './TaskList.css';

class TaskList extends React.Component {
  render() {
    const { todoList, onTaskDeleted, onTaskCompleted } = this.props;
    const todoItems = todoList.map((item) => {
      return (
        <li className={!item.isActive ? 'completed' : ''} key={item.id}>
          <Task
            content={item.content}
            onDelete={() => onTaskDeleted(item.id)}
            onComplete={() => onTaskCompleted(item.id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{todoItems}</ul>;
  }
}

export default TaskList;
