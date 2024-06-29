/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskCheckbox from './TaskCheckbox';
import TaskChange from './TaskChange';
import './Task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onTaskCheckboxClick = () => {
    const { content } = this.props;
    console.log(`Задача выполнена: "${content}"`, this);
  };

  tick() {
    this.setState((prevState) => {
      return {
        date: new Date(prevState.date.getTime() - 1000),
      };
    });
  }

  render() {
    const { content, onDelete } = this.props;
    const { date } = this.state;

    return (
      <form>
        <div className="view">
          <TaskCheckbox onClick={this.onTaskCheckboxClick} />
          <label>
            <span className="description">{content}</span>
            <span className="created">{formatDistanceToNow(date)} ago</span>
          </label>
          <button className="icon icon-edit" type="button"></button>
          <button className="icon icon-destroy" type="button" onClick={onDelete}></button>
        </div>
        <TaskChange />
      </form>
    );
  }
}

export default Task;
