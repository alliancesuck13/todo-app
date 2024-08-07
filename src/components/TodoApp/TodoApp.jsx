import { useState } from "react";
import { getMinutes, getSeconds, getTime } from "date-fns";

import TaskList from "../Tasks/TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";

import generateUniqueID from "./utils/generateUniqueID";
import "./TodoApp.css";

export default function TodoApp() {
  const [todoList, setTodoList] = useState([]);

  const [todoListCount, setTodoListCount] = useState(0);

  const [filter, setFilter] = useState("all");

  const [timerIDS, setTimerIDS] = useState([]);

  const addTask = (text, time) => {
    const newTask = {
      id: generateUniqueID(),
      content: text,
      isEditing: false,
      isActive: true,
      creationDate: new Date(),
      timeToDoTask: getTime(time),
    };

    setTodoList((prevList) => prevList.toSpliced(0, 0, newTask));
    setTodoListCount((prevCount) => prevCount + 1);
  };

  const editTask = (id, text) => {
    setTodoList((prevList) =>
      prevList.map((task) => {
        if (task.id === id) {
          return { ...task, content: text };
        }

        return task;
      })
    );
  };

  const completeTask = (id) => {
    setTodoList((prevList) =>
      prevList.map((task) => {
        if (task.id === id) {
          if (task.isActive) {
            setTodoListCount(todoListCount - 1);
          } else {
            setTodoListCount(todoListCount + 1);
          }
          return {
            ...task,
            isActive: !task.isActive,
          };
        }

        return task;
      })
    );

    clearTaskTimer(id);
  };

  const deleteTask = (id) => {
    let index = 0;
    setTodoList((prevList) => {
      index = prevList.findIndex((task) => task.id === id);

      return prevList.toSpliced(index, 1);
    });

    setTodoListCount((prevCount) => {
      const updatedCount = todoList[index].isActive ? prevCount - 1 : prevCount;
      return updatedCount;
    });

    clearTaskTimer(id);
  };

  const renderAllTasks = () => {
    return todoList;
  };

  const renderActiveTasks = () => {
    return todoList.filter((task) => task.isActive);
  };

  const renderCompletedTasks = () => {
    return todoList.filter((task) => !task.isActive);
  };

  const handleRenderAllTasks = () => {
    setFilter("all");
  };

  const handleRenderActiveTasks = () => {
    setFilter("active");
  };

  const handleRenderCompletedTasks = () => {
    setFilter("completed");
  };

  const handleClearCompleted = () => {
    const completedTasks = todoList.filter((task) => !task.isActive);

    completedTasks.forEach((task) => {
      deleteTask(task.id);
    });
  };

  const handleEditTask = (id) => {
    setTodoList((prevList) =>
      prevList.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing: !task.isEditing };
        }

        return task;
      })
    );
  };

  const handleStartTimer = (id) => {
    let isTimerExists = false;

    timerIDS.forEach((timerID) => {
      if (Object.keys(timerID)[0] === id) isTimerExists = true;
    });

    if (!isTimerExists) {
      const timer = setInterval(() => {
        setTodoList((prevList) =>
          prevList.map((task) => {
            if (
              task.id === id &&
              !(
                getMinutes(task.timeToDoTask) === 0 && getSeconds(task.timeToDoTask) === 0
              )
            ) {
              return { ...task, timeToDoTask: task.timeToDoTask - 1000 };
            }

            if (
              task.id === id &&
              getMinutes(task.timeToDoTask) === 0 &&
              getSeconds(task.timeToDoTask) === 0
            ) {
              clearTaskTimer(id);
            }

            return task;
          })
        );
      }, 1000);

      const newTimer = {};
      newTimer[id] = timer;

      setTimerIDS((prevTimers) => [...prevTimers, newTimer]);
    }
  };

  const handleStopTimer = (id) => {
    clearTaskTimer(id);
  };

  const clearTaskTimer = (id) => {
    setTimerIDS((prevTimers) => {
      prevTimers.forEach((timer) => {
        if (Object.keys(timer)[0] === id) clearInterval(timer[id]);
      });
      const updatedTimers = prevTimers.filter((timer) => Object.keys(timer)[0] !== id);
      return updatedTimers;
    });
  };

  let filteredTodoList = [];

  if (filter === "completed") {
    filteredTodoList = renderCompletedTasks();
  } else if (filter === "active") {
    filteredTodoList = renderActiveTasks();
  } else {
    filteredTodoList = renderAllTasks();
  }

  return (
    <section className="todoapp">
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          todoList={filteredTodoList}
          onTaskDeleted={deleteTask}
          onTaskCompleted={completeTask}
          onTaskEdited={editTask}
          handleEditTask={handleEditTask}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
        />
        <Footer
          todoListCount={todoListCount}
          handleClearCompleted={handleClearCompleted}
          handleRenderAllTasks={handleRenderAllTasks}
          handleRenderActiveTasks={handleRenderActiveTasks}
          handleRenderCompletedTasks={handleRenderCompletedTasks}
          filter={filter}
        />
      </section>
    </section>
  );
}
