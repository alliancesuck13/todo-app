import './NewTaskForm.css';

export default function NewTaskForm() {
  const placeholder = 'What needs to be done?';

  return (
    <header className="header">
      <h1>Todo App</h1>
      <input className="new-todo" placeholder={placeholder} />
    </header>
  );
}
