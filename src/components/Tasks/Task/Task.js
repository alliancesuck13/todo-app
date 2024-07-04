/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

class Task extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  keyDown = (e) => {
    const { onEdit, handleEditTask } = this.props;
    if (e.key === 'Enter') {
      if (e.target.value.length === 0) return;
      if (e.target.value.match(/^[ ]+$/)) return;
      onEdit(e.target.value);
      handleEditTask();
    }
    if (e.key === 'Escape') handleEditTask();
  };

  render() {
    const { content, creationDate, isChecked, onDelete, onComplete, handleEditTask } =
      this.props;

    const createdAt = formatDistanceToNow(new Date(creationDate), { addSuffix: true });
    const hide = {};

    if (isChecked) hide.display = 'none';
    else hide.display = '';

    return (
      <>
        <div className="view">
          <input
            className="toggle"
            id="toggleID"
            type="checkbox"
            onClick={onComplete}
            defaultChecked={isChecked}
          />
          <label htmlFor="toggleID">
            <span className="description">{content}</span>
            <span className="created">{createdAt}</span>
          </label>
          <button
            className="icon icon-edit"
            style={hide}
            type="button"
            onClick={handleEditTask}
          ></button>
          <button className="icon icon-destroy" type="button" onClick={onDelete}></button>
        </div>
        <input type="text" className="edit" onKeyDown={this.keyDown} />
      </>
    );
  }
}

export default Task;
