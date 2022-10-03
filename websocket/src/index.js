const express = require('express')
const apiRoutes = require('../routers/app.routes')
const ProductsConstructor = require('../model/productsConstructor')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

// Set templates
app.set('views', './views');
app.set('views engine', 'ejs');

// Ejs
let Product

ProductsConstructor.getAll().then(res => {
    Product = res
})
app.get('/api/products', (req, res) => {
    res.render('index.ejs', {
            products: Product, showProducts: Product.length
    })
})

// Routes
app.use('/api', apiRoutes)


// Websocket
const messages = []
const users = []
const botName = 'Crazy bot'
// Socket Events
io.on('connection', (socket) => {
    console.log("New client connection!");

    // Getting all messages
    socket.emit('messages', [...messages]);

    // Welcome to chat
    socket.on("join-chat", (data) => {
    const newUser = {
        id: socket.id,
        username: data.username
    };
    users.push(newUser);
    })

    // New message
    socket.on("new-message", (data) => {
        const author = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(socket.id, author.username, data);
        messages.push(newMessage);
        io.emit('chat-message', newMessage);
    })

});

// Listen
httpServer.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

httpServer.on('error', (error) => {
    console.log(error.message);
})