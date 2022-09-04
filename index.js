const express = require('express')
const Products = require('./productsConstructor')

let Prod = []
let ProdById = []
Products.getAll().then(res => Prod = res)
Products.getById(2).then(res => ProdById = res)


const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req, res) => {
    res.send(`<h1>Pagina de inicio.</h1>
    <p>Si desea ir a la pagina de productos, dar click en:
    <a href="/productos">Productos</a>
    <a href="/productorandom">Producto random</a>
    </p>`)
})

app.get('/productos', (req, res) => {
    res.send(`<h1>Productos</h1>
    ${Prod.map(el => {return `<p>${el.title}</p>
    <p>Precio: $${el.price}</p>`})}
    <a href="/productorandom">Producto random</a>
    <a href="/">Home</a>
    `)
})

app.get('/productorandom', (req, res) => {
    res.send(`<h1>Producto Random</h1>
    <p>${ProdById.title}</p>
    <p>Precio: $${ProdById.price}</p>
    <a href="/productos">Productos</a>
    <a href="/">Home</a>
    `)
})

const connectedServer = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})
