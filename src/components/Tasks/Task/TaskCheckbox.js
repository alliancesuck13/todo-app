export default function TaskCheckbox({ onClick = null }) {
  return <input className="toggle" type="checkbox" onClick={onClick} />;
}
