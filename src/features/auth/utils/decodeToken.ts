import { toast } from 'react-toastify'

export const decodeToken = (token: string): { userId: number } | null => {
  try {
    const payloadBase64 = token.split('.')[1] // Берём среднюю часть
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')) // Декодируем Base64URL

    return JSON.parse(payloadJson) // Парсим JSON
  } catch {
    toast.error('Ошибка при декодировании токена')

    return null
  }
}
