export function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`
}
