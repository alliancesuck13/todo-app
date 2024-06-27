import './TaskFilter.css';

export default function TaskFilter() {
  const buttonAll = (
    <button type="button" className="selected">
      All
    </button>
  );
  const buttonActive = <button type="button">Active</button>;
  const buttonCompleted = <button type="button">Completed</button>;

  const buttons = [
    { key: 1, button: buttonAll },
    { key: 2, button: buttonActive },
    { key: 3, button: buttonCompleted },
  ].map((button) => {
    return <li key={button.key}>{button.button}</li>;
  });

  return <ul className="filters">{buttons}</ul>;
}
