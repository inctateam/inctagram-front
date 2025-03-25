import { WebSocketNotification } from '../types'

export const transformWebSocketNotification = (wsNotification: WebSocketNotification) => {
  return {
    createdAt: wsNotification.createdAt,
    id: wsNotification.id,
    isRead: wsNotification.isRead,
    message: wsNotification.message,
  }
}
