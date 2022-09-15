const express = require('express')
const apiRoutes = require('./routers/app.routes')

const PORT = process.env.PORT || 8080
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

// Routes
app.use('/api', apiRoutes)

const connectedServer = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})