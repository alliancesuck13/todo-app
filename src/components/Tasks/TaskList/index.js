import Task from '../Task';
import './TaskList.css';

export default function TaskList() {
  return (
    <ul className="todo-list">
      <Task />
    </ul>
  );
}
