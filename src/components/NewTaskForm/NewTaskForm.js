/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  static defaultProps = {
    onTaskAdded: () => {
      throw new TypeError(`Отсутствует prop добавления Task в ${this}`);
    },
  };

  // В данном проекте у меня нет сервера на который отправляются данные
  // поэтому я не вижу никакого смысла оборачивать инпут в <form></form> =)
  onEnter = (e) => {
    const { onTaskAdded } = this.props;

    if (e.target.value.match(/^[ ]+$/)) return;
    if (e.key === 'Enter' && e.target.value) {
      onTaskAdded(e.target.value);
      e.target.value = '';
    }
  };

  render() {
    const placeholder = 'What needs to be done?';

    return (
      <header className="header">
        <h1>Todo App</h1>
        <input className="new-todo" placeholder={placeholder} onKeyDown={this.onEnter} />
      </header>
    );
  }
}

export default NewTaskForm;
