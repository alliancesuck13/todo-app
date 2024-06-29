import React from 'react';

import TaskList from '../Tasks/TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';

import generateUniqueID from './utils/generateUniqueID';
import './TodoApp.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
    };
  }

  deleteTask = (id) => {
    this.setState((prevState) => {
      const index = prevState.todoList.findIndex((task) => task.id === id);

      return {
        todoList: prevState.todoList.toSpliced(index, 1),
      };
    });
  };

  addTask = (text) => {
    const newTask = {
      id: generateUniqueID(),
      content: text,
    };

    this.setState((prevState) => {
      return {
        todoList: prevState.todoList.toSpliced(newTask),
      };
    });

    console.log(`added ${generateUniqueID()}`, text, this);
  };

  // todo: сделать корректное добавление такски

  render() {
    const { todoList } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <TaskList
          todoList={todoList}
          onTaskDeleted={this.deleteTask}
          onTaskAdded={this.addTask}
        />
        <Footer />
      </section>
    );
  }
}

export default TodoApp;
