import Task from '../Task';
import './TaskList.css';

export default function TaskList({ todoList = [] }) {
  const todoItems = todoList.map((item) => {
    return (
      <li key={item.id}>
        <Task content={item.content} />
      </li>
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{todoItems}</ul>
    </section>
  );
}
