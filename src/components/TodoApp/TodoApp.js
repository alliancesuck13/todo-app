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
      todoListCount: 0,
    };
  }

  deleteTask = (id) => {
    this.setState((prevState) => {
      const index = prevState.todoList.findIndex((task) => task.id === id);

      return {
        todoList: prevState.todoList.toSpliced(index, 1),
        todoListCount: prevState.todoList[index].isActive
          ? prevState.todoListCount - 1
          : prevState.todoListCount,
      };
    });
  };

  handleClearCompleted = () => {
    const { todoList } = this.state;
    const completedTasks = todoList.filter((task) => !task.isActive);

    completedTasks.forEach((task) => {
      this.deleteTask(task.id);
    });
  };

  addTask = (text) => {
    const newTask = {
      id: generateUniqueID(),
      content: text,
      isActive: true,
    };

    this.setState((prevState) => {
      const updatedTodoList = prevState.todoList.toSpliced(0, 0, newTask);
      const updatedCount = prevState.todoListCount + 1;

      return {
        todoList: updatedTodoList,
        todoListCount: updatedCount,
      };
    });
  };

  completeTask = (id) => {
    this.setState((prevState) => {
      let updatedTodoListCount = prevState.todoListCount;
      const updatedTodoList = prevState.todoList.map((task) => {
        if (task.id === id) {
          if (task.isActive) {
            updatedTodoListCount -= 1;
          } else {
            updatedTodoListCount += 1;
          }
          return { ...task, isActive: !task.isActive };
        }
        return task;
      });

      return {
        todoList: updatedTodoList,
        todoListCount: updatedTodoListCount,
      };
    });
  };

  render() {
    const { todoList, todoListCount } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            todoList={todoList}
            onTaskDeleted={this.deleteTask}
            onTaskCompleted={this.completeTask}
          />
          <Footer
            todoListCount={todoListCount}
            handleClearCompleted={this.handleClearCompleted}
          />
        </section>
      </section>
    );
  }
}

export default TodoApp;
