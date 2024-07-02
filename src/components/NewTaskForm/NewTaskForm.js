/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  render() {
    const { onTaskAdded } = this.props;

    const placeholder = 'What needs to be done?';

    return (
      <header className="header">
        <h1>Todo App</h1>
        <input
          className="new-todo"
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.target.value.match(/^[ ]+$/)) return;
            if (e.key === 'Enter' && e.target.value) {
              onTaskAdded(e.target.value.trim());
              e.target.value = '';
            }
          }}
        />
      </header>
    );
  }
}

export default NewTaskForm;
