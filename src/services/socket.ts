import { io } from 'socket.io-client'

const isServer = () => typeof window === 'undefined'

const accessToken = isServer() ? null : localStorage.getItem('access_token')

const queryParams = {
  query: {
    accessToken: accessToken,
  },
}

const socket = io('https://inctagram.work', queryParams)

socket.on('connect', () => {
  console.log('WebSocket connected')
})

socket.on('disconnect', () => {
  console.log('WebSocket disconnected')
})
export default socket
