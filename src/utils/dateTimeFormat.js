export function formatDate(dateString) {
  const d = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${monthName}, ${day} ${year}`;
}

export function formatTime(dateString) {
  const d = new Date(dateString);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function sessionDurationInMinutes(openedAt) {
  const start = new Date(openedAt);
  const now = new Date();

  const diffMs = now - start;

  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  return `${diffMinutes}m ago`;
}
