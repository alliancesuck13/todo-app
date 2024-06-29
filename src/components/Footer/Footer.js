/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import TaskFilter from './TaskFilter';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <TaskFilter />
        <button className="clear-completed" type="button">
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
