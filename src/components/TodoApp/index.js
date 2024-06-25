import TaskList from '../Tasks/TaskList';
import NewTaskForm from '../NewTaskForm';
import './TodoApp.css';

const todoList = [
  { id: 1, content: 'learn react' },
  { id: 2, content: 'to stay of gigachad' },
  { id: 3, content: 'get the car' },
];

export default function TodoApp() {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <TaskList todoList={todoList} />
    </section>
  );
}
