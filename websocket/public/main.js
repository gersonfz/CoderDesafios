const socket = io()

socket.on('server-message', (data) => {
    alert(data)
})