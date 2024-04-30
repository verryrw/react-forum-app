import TimeAgo from 'javascript-time-ago';
import id from 'javascript-time-ago/locale/id';

TimeAgo.addDefaultLocale(id);

function convertDateToTimeago(date) {
  const timeAgo = new TimeAgo();
  return timeAgo.format(date);
}

export default convertDateToTimeago;
