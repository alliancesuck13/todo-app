/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

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

  tick() {
    this.setState((prevState) => {
      return {
        date: new Date(prevState.date.getTime() - 1000),
      };
    });
  }

  render() {
    const { content, onDelete, onComplete } = this.props;
    const { date } = this.state;

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onComplete} />
          <label>
            <span className="description">{content}</span>
            <span className="created">{formatDistanceToNow(date)} ago</span>
          </label>
          <button className="icon icon-edit" type="button"></button>
          <button className="icon icon-destroy" type="button" onClick={onDelete}></button>
        </div>
        {/* todo: edit input */}
        {/* <input
          type="text"
          className="edit"
          onKeyDown={(e) => {
            if (e.target.value.match(/^[ ]+$/)) return;
            if (e.key === 'Enter' && e.target.value) {
              onTaskAdded(e.target.value.trim());
              e.target.value = '';
            }
          }}
        /> */}
      </>
    );
  }
}

export default Task;
