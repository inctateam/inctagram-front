export interface Notification {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}

export interface GetNotificationsParams {
  cursor?: number
  isRead?: boolean
  pageSize?: null | number
  sortBy?: string //'notifyAt'?
  sortDirection?: 'asc' | 'desc'
}

export interface GetNotificationsResponse {
  items: Notification[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export interface WebSocketNotification {
  clientId: string
  createdAt: string
  eventType: number
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}
