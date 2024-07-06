/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

class TaskList extends React.Component {
  static propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    onTaskDeleted: PropTypes.func,
    onTaskCompleted: PropTypes.func,
    onTaskEdited: PropTypes.func,
    handleEditTask: PropTypes.func,
  };

  static defaultProps = {
    todoList: [
      {
        id: 1,
        content: 'Fix bugs',
        isEditing: false,
        isActive: true,
        creationDate: new Date(),
      },
      {
        id: 2,
        content: 'Watch to your code',
        isEditing: false,
        isActive: true,
        creationDate: new Date(),
      },
      {
        id: 3,
        content: 'Being stupid',
        isEditing: false,
        isActive: false,
        creationDate: new Date(),
      },
    ],
    onTaskDeleted: () => {
      throw new TypeError(`Отсутствует prop удаления Task в ${this}`);
    },
    onTaskCompleted: () => {
      throw new TypeError(`Отсутствует prop выполнения Task в ${this}`);
    },
    onTaskEdited: () => {
      throw new TypeError(`Отсутствует prop редактирования Task в ${this}`);
    },
    handleEditTask: () => {
      throw new TypeError(`Отсутствует prop ожидания редактирования Task в ${this}`);
    },
  };

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
