import { useState } from "react";
import { getTime } from "date-fns";

import TaskList from "../Tasks/TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";

import generateUniqueID from "./utils/generateUniqueID";
import "./TodoApp.css";

export default function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [todoListCount, setTodoListCount] = useState(0);
  const [filter, setFilter] = useState("all");

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
            timerIsStarted: !task.timerIsStarted,
          };
        }

        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTodoList((prevList) => {
      const index = prevList.findIndex((task) => task.id === id);
      setTodoListCount((prevCount) => {
        const updatedCount = todoList[index].isActive ? prevCount - 1 : prevCount;
        return updatedCount;
      });
      return prevList.toSpliced(index, 1);
    });
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
