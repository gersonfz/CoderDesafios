const express = require('express')
const path = require('path')
const apiRoutes = require('./routers/app.routes')
const { engine } = require('express-handlebars')
const ProductsConstructor = require('./model/productsConstructor')

let Product

ProductsConstructor.getAll().then(res => {
    Product = res
})

const PORT = process.env.PORT || 8080
const app = express()


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))


// Set templates
app.set('views', './views');
app.set('view engine', 'hbs');

// Views Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.get('/api/products', (req, res) => {
    res.render('index.hbs', {
        products: Product, showProducts: Product.length
    })
})

// Routes
app.use('/api', apiRoutes)

const connectedServer = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})