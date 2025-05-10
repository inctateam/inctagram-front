export const formatMessageDate = (
  dateString: string,
  includeTimeForWeek: boolean = false
): string => {
  const messageDate = new Date(dateString)
  const now = new Date()

  const isToday =
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()

  if (isToday) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const startOfWeek = new Date(now)

  startOfWeek.setDate(now.getDate() - now.getDay()) // Sunday = 0

  const isThisWeek = messageDate >= startOfWeek

  if (isThisWeek) {
    const weekday = messageDate.toLocaleDateString('en-US', { weekday: 'short' })

    if (includeTimeForWeek) {
      const time = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      return `${weekday} ${time}`
    }

    return weekday
  }

  return messageDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  })
}
