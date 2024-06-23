import './TodoInput.css';

const placeholder = 'What needs to be done?';

export default function TodoInput() {
  return <input className="new-todo" placeholder={placeholder} />;
}
