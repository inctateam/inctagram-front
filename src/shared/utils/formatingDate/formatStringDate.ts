import { format, parseISO } from 'date-fns'

export function formatDateToString(dateString: string, dateFormat: string = 'dd.MM.yyyy'): string {
  // Преобразуем строку ISO в объект Date
  const date = parseISO(dateString)

  // Возвращаем отформатированную строку
  return format(date, dateFormat)
}
