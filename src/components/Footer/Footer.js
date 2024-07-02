/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import TaskFilter from './TaskFilter';
import './Footer.css';

class Footer extends React.Component {
  render() {
    const { todoListCount, handleClearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoListCount} tasks left</span>
        <TaskFilter />
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
