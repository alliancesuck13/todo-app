import TaskList from '../Tasks/TaskList';
import Header from '../Header';
import Main from '../Main';
import './TodoApp.css';

export default function TodoApp() {
  return (
    <section className="todoapp">
      <Header />
      <Main>
        <TaskList />
      </Main>
    </section>
  );
}
