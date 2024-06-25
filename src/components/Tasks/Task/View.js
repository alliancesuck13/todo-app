import './View.css';

export default function View({ description, createdDate = null }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{description}</span>
        <span className="created">{createdDate}</span>
      </label>
      <button className="icon icon-edit" type="button"></button>
      <button className="icon icon-destroy" type="submit"></button>
    </div>
  );
}
