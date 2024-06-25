import TaskCheckbox from './TaskCheckbox';
import './View.css';

export default function View({ description, createdDate = null }) {
  return (
    <form className="view">
      <TaskCheckbox />
      <label>
        <span className="description">{description}</span>
        <span className="created">{createdDate}</span>
      </label>
      <button className="icon icon-edit" type="button"></button>
      <button className="icon icon-destroy" type="submit"></button>
    </form>
  );
}
