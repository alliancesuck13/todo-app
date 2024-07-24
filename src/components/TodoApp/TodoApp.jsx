/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from "react";
import { getTime } from "date-fns";

import TaskList from "../Tasks/TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";

import generateUniqueID from "./utils/generateUniqueID";
import "./TodoApp.css";

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      todoList: TodoApp.getStateFromLocalStorage("todoList", []),
      todoListCount: TodoApp.getStateFromLocalStorage("todoListCount", 0),
      filter: TodoApp.getStateFromLocalStorage("filter", "all"),
      dateOfTasks: TodoApp.getStateFromLocalStorage("dateOfTasks", []),
    };
  }

  static getStateFromLocalStorage(key = "", defaultState = null) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultState;
  }

  // ToDo: УМЕНЬШЕНИЕ ТАЙМЕРА ПРИ ПЕРЕКЛЮЧЕНИИ ФИЛЬТРОВ: ПЕРЕНЕСТИ DATEOFTASKS В ADDTASK

  // componentDidMount() {
  //   this.timerID = setInterval(() => {
  //     // this.setState((prevState) => {
  //     //   const updatedDateOfTasks = prevState.dateOfTasks.map((task) => {
  //     //     const id = Object.keys(task)[0];
  //     //     return { task: prevState.id - 1000 };
  //     //   });

  //     //   return {
  //     //     dateOfTasks: updatedDateOfTasks,
  //     //   };
  //     // });
  //     // const { todoList, filter } = this.state;
  //     // this.setState((prevState) => {
  //     //   const updatedDateOfTasks = prevState.dateOfTasks.map((taskDate) => {
  //     //     if (todoList.length !== prevState.todoList.length && filter !== "all") {
  //     //       if (taskDate.isTimerStarted) {
  //     //         return { ...taskDate, value: prevState.taskDate.value - 1000 };
  //     //       }
  //     //     }
  //     //     return taskDate;
  //     //   });

  //     //   return {
  //     //     dateOfTasks: updatedDateOfTasks,
  //     //   };
  //     // });

  //     this.forceUpdate();
  //   }, 1000);
  // }

  componentDidUpdate() {
    const { todoList, todoListCount, filter, dateOfTasks } = this.state;

    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("todoListCount", JSON.stringify(todoListCount));
    localStorage.setItem("filter", JSON.stringify(filter));
    localStorage.setItem("dateOfTasks", JSON.stringify(dateOfTasks));
  }

  addTask = (text, time) => {
    const newTask = {
      id: generateUniqueID(),
      content: text,
      isEditing: false,
      isActive: true,
      creationDate: new Date(),
      timeToDoTask: time,
      timerIsStarted: true,
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

  addDateOfTasks = () => {
    this.setState((prevState) => {
      let timers = prevState.todoList.map((task) => {
        return [task.id, task.timeToDoTask, task.timerIsStarted];
      });

      timers = timers.map((date) => {
        const obj = {};
        const [id, timestamp, isTimerStarted] = date;

        obj.id = id;
        obj.value = getTime(timestamp);
        obj.isTimerStarted = isTimerStarted;

        return obj;
      });
      return {
        dateOfTasks: timers,
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

  stopTimerOnTask = (id) => {
    const { todoList } = this.state;
    this.setState(() => {
      const updatedTodoList = todoList.map((task) => {
        if (task.id === id) {
          return { ...task, timerIsStarted: false };
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
          return { ...task, timerIsStarted: true };
        }
        return task;
      });

      return {
        todoList: updatedTodoList,
      };
    });
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
    this.addDateOfTasks();
  };

  handleRenderActiveTasks = () => {
    this.setState({ filter: "active" });
    this.addDateOfTasks();
  };

  handleRenderCompletedTasks = () => {
    this.setState({ filter: "completed" });
    this.addDateOfTasks();
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
