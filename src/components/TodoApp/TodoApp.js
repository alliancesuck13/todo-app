import React from 'react';

import TaskList from '../Tasks/TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';

import generateUniqueID from './utils/generateUniqueID';
import './TodoApp.css';

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      todoList: [],
      todoListCount: 0,
      filter: 'all', // all, active or completed
    };
  }

  addTask = (text) => {
    const newTask = {
      id: generateUniqueID(),
      content: text,
      isEditing: false,
      isActive: true,
      creationDate: new Date(),
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

  editTask = (id, ...text) => {
    this.setState((prevState) => {
      const updatedTodoList = prevState.todoList.map((task) => {
        if (task.id === id) {
          return { ...task, content: text };
        }

        return task;
      });

      return {
        todoList: updatedTodoList,
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

  deleteTask = (id) => {
    this.setState((prevState) => {
      const index = prevState.todoList.findIndex((task) => task.id === id);

      const updatedTodoList = prevState.todoList.toSpliced(index, 1);

      const updatedCount = prevState.todoList[index].isActive
        ? prevState.todoListCount - 1
        : prevState.todoListCount;

      return {
        todoList: updatedTodoList,
        todoListCount: updatedCount,
      };
    });
  };

  renderAllTasks = () => {
    const { todoList } = this.state;
    return todoList;
  };

  renderActiveTasks = () => {
    const { todoList } = this.state;
    return todoList.filter((task) => task.isActive);
  };

  renderCompletedTasks = () => {
    const { todoList } = this.state;
    return todoList.filter((task) => !task.isActive);
  };

  handleRenderAllTasks = () => {
    this.setState({ filter: 'all' });
  };

  handleRenderActiveTasks = () => {
    this.setState({ filter: 'active' });
  };

  handleRenderCompletedTasks = () => {
    this.setState({ filter: 'completed' });
  };

  handleClearCompleted = () => {
    const { todoList } = this.state;

    const completedTasks = todoList.filter((task) => !task.isActive);

    completedTasks.forEach((task) => {
      this.deleteTask(task.id);
    });
  };

  handleEditTask = (id) => {
    this.setState((prevState) => {
      const nowEditing = prevState.todoList.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing: !task.isEditing };
        }

        return task;
      });

      return {
        todoList: nowEditing,
      };
    });
  };

  render() {
    const { todoListCount, filter } = this.state;
    let filteredTodoList = [];

    if (filter === 'completed') {
      filteredTodoList = this.renderCompletedTasks();
    } else if (filter === 'active') {
      filteredTodoList = this.renderActiveTasks();
    } else {
      filteredTodoList = this.renderAllTasks();
    }

    return (
      <section className="todoapp">
        <NewTaskForm onTaskAdded={this.addTask} />
        <section className="main">
          <TaskList
            todoList={filteredTodoList}
            onTaskDeleted={this.deleteTask}
            onTaskCompleted={this.completeTask}
            onTaskEdited={this.editTask}
            handleEditTask={this.handleEditTask}
          />
          <Footer
            todoListCount={todoListCount}
            handleClearCompleted={this.handleClearCompleted}
            handleRenderAllTasks={this.handleRenderAllTasks}
            handleRenderActiveTasks={this.handleRenderActiveTasks}
            handleRenderCompletedTasks={this.handleRenderCompletedTasks}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}

export default TodoApp;
