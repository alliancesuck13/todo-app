/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from './TaskFilter';
import './Footer.css';

class Footer extends React.Component {
  static propTypes = {
    todoListCount: PropTypes.number,
    handleClearCompleted: PropTypes.func,
    handleRenderAllTasks: PropTypes.func,
    handleRenderCompletedTasks: PropTypes.func,
    handleRenderActiveTasks: PropTypes.func,
    filter: PropTypes.string,
  };

  static defaultProps = {
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
    filter: '',
  };

  render() {
    const {
      todoListCount,
      handleClearCompleted,
      handleRenderAllTasks,
      handleRenderCompletedTasks,
      handleRenderActiveTasks,
      filter,
    } = this.props;

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
}

export default Footer;
