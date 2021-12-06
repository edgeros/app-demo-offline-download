import io from 'socket.io-client'
class SocketIO {
  constructor () {
    this.socket = io('https://192.168.128.1:7376')
    this.socket.on('connect', () => {
      console.log('>> 已连接！')
    })
  }

  push (event, msg) {
    this.socket.emit(event, msg, (response) => {
      console.log('>>>> res:', response)
    })
  }
}

export const socketio = new SocketIO()
