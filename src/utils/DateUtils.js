export const formatDateTime = (timestamp) => {
  var d = new Date(timestamp * 1000);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return (
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    " " +
    pad(d.getDate()) +
    "/" +
    pad(d.getMonth() + 1) +
    "/" +
    pad(d.getFullYear())
  );
}

export const timeSince = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " năm trước";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng trước";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày trước";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }

  return "Vừa cập nhật";
}