import { Avatar } from '@/features/home-page/ui/user-profile/types/user-profile.types'

export type MessageStatus = 'READ' | 'RECEIVED' | 'SENT'
export type MessageType = 'IMAGE' | 'TEXT' | 'VOICE'

export interface Message {
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
}
export interface LatestMessage {
  avatars: Avatar[]
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
  userName: string
}

export interface MessageSendRequest {
  audioBuffer?: Uint8Array // буфер для голосовых сообщений, необязателен
  isVoice?: boolean // флаг для голосового сообщения
  message: FormData | string // либо FormData, либо текстовое сообщение
  receiverId: number // ID получателя
}
export interface MessageUpdateRequest {
  id: number
  message: string
}

export interface PaginationMessengerResponse {
  notReadCount?: number
  pageSize: number
  totalCount: number
}

export interface GetLatestMessages extends PaginationMessengerResponse {
  items: LatestMessage[]
}
export interface GetMessagesByUser extends PaginationMessengerResponse {
  items: Message[]
}

export interface GetMessagesQueryParams {
  cursor?: number
  pageSize?: number
  searchName?: string
}
