const express = require('express')
const path = require('path')
const apiRoutes = require('./routers/app.routes')
const { engine } = require('express-handlebars')
const ProductsConstructor = require('./model/productsConstructor')


const PORT = process.env.PORT || 8080
const app = express()
const products = new ProductsConstructor()


// Views Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

// Set Handlebars
app.set('views', './views');
app.set('views engine', 'hbs');
app.get('/api/products', (req, res) => {
    res.render('index.hbs', {products: products.getAll()});
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', apiRoutes)

const connectedServer = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})