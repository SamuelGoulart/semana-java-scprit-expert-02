const server = require('http').createServer((request, response) => {
    response.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    })
    response.end('hey there!')
})

const socketIo = require('socket.io')
const io = socketIo(server, {
    cors: {
        origin: '*',
        credential: false
    }
})

io.on('connection', socket => {
    console.log('connection', socket.id)
    socket.on('join-room', (roomId, userId) => {
        //Adiciona os usuários na mesma sala
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
        socket.on('disconnect', () => {
            console.log('disconnect!', roomId, userId)
            socket.to(roomId).emit('user-disconnected', userId)
        })
    })
})

const startServer = () => {
    const { address, port } = server.address()
    console.info(`app running at ${address}:${port}`)
}

server.listen(process.env.PORT || 3000, startServer)