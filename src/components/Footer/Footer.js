import TaskFilter from './TaskFilter';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter />
      <button className="clear-completed" type="button">
        Clear completed
      </button>
    </footer>
  );
}
