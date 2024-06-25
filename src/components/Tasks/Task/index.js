import View from './View';
import './Task.css';

export default function Task({ content }) {
  return (
    <View
      description={content}
      createdDate={`created ${new Date().getHours()}:${new Date().getMinutes()}`}
    />
  );
}
