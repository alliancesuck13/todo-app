/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import Task from '../Task';
import './TaskList.css';

class TaskList extends React.Component {
  render() {
    const { todoList, onTaskDeleted } = this.props;
    const todoItems = todoList.map((item) => {
      return (
        <li key={item.id}>
          <Task content={item.content} onDelete={() => onTaskDeleted(item.id)} />
        </li>
      );
    });

    return (
      <section className="main">
        <ul className="todo-list">{todoItems}</ul>
      </section>
    );
  }
}

export default TaskList;
