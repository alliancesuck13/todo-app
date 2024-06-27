import { formatDistanceToNow } from 'date-fns';

import View from './View';
import './Task.css';

export default function Task({ content }) {
  const createdAt = formatDistanceToNow(new Date(), { includeSeconds: true });

  return <View description={content} createdDate={createdAt} />;
}
