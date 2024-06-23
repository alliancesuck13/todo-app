import './View.css';

export default function View() {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">Active task</span>
        <span className="created">... ago</span>
      </label>
      <button className="icon icon-edit" type="button"></button>
      <button className="icon icon-destroy" type="submit"></button>
    </div>
  );
}
