/* eslint-disable react/no-unused-state */
import React from "react";
import { getMinutes, getSeconds, getTime } from "date-fns";

import TaskList from "../Tasks/TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";

import generateUniqueID from "./utils/generateUniqueID";
import "./TodoApp.css";

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      todoList: [],
      todoListCount: 0,
      filter: "all",
    };
  }

  componentDidMount() {
    this.timerID = setInterval(this.updateTaskTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  addTask = (text, time) => {
    const newTask = {
      id: generateUniqueID(),
      content: text,
      isEditing: false,
      isActive: true,
      creationDate: new Date(),
      timeToDoTask: getTime(time),
      timerIsStarted: false,
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

  editTask = (id, text) => {
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
          return {
            ...task,
            isActive: !task.isActive,
            timerIsStarted: !task.timerIsStarted,
          };
        }

        return task;
      });

      return {
        todoList: updatedTodoList,
        todoListCount: updatedTodoListCount,
      };
    });
  };

  completeTaskWhenTimerEnd = (id) => {
    const { todoListCount } = this.state;
    this.setState((prevState) => {
      const updatedTodoListCount = todoListCount - 1;
      const updatedTodoList = prevState.todoList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isActive: false,
            timerIsStarted: false,
          };
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

  stopTimerOnTask = (id) => {
    const { todoList } = this.state;
    this.setState(() => {
      const updatedTodoList = todoList.map((task) => {
        if (task.id === id) {
          if (task.isActive) return { ...task, timerIsStarted: false };
        }
        return task;
      });

      return {
        todoList: updatedTodoList,
      };
    });
  };

  startTimerOnTask = (id) => {
    const { todoList } = this.state;
    this.setState(() => {
      const updatedTodoList = todoList.map((task) => {
        if (task.id === id) {
          if (task.isActive) return { ...task, timerIsStarted: true };
        }
        return task;
      });

      return {
        todoList: updatedTodoList,
      };
    });
  };

  updateTaskTimer = () => {
    const { filter, todoList } = this.state;

    if (filter !== "all" && todoList.length !== 0) {
      this.setState((prevState) => {
        const updatedTodoList = prevState.todoList.map((task) => {
          if (
            getMinutes(task.timeToDoTask) === 0 &&
            getSeconds(task.timeToDoTask) === 0
          ) {
            return task;
          }

          if (task.timerIsStarted && task.isActive) {
            return { ...task, timeToDoTask: task.timeToDoTask - 1000 };
          }

          return task;
        });

        return {
          todoList: updatedTodoList,
        };
      });
    }
  };

  setNewTimerTask = (id, timestamp) => {
    const { todoList } = this.state;

    this.setState(() => {
      const updatedTodoList = todoList.map((task) => {
        if (task.id === id) {
          return { ...task, timeToDoTask: timestamp };
        }
        return task;
      });

      return {
        todoList: updatedTodoList,
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
    this.setState({ filter: "all" });
  };

  handleRenderActiveTasks = () => {
    this.setState({ filter: "active" });
  };

  handleRenderCompletedTasks = () => {
    this.setState({ filter: "completed" });
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

    if (filter === "completed") {
      filteredTodoList = this.renderCompletedTasks();
    } else if (filter === "active") {
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
            completeTaskWhenTimerEnd={this.completeTaskWhenTimerEnd}
            onTimerTaskStoped={this.stopTimerOnTask}
            onTimerTaskStarted={this.startTimerOnTask}
            handleEditTask={this.handleEditTask}
            setNewTimerTask={this.setNewTimerTask}
            filter={filter}
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
