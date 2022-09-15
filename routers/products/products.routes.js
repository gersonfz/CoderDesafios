const express = require('express');
const products = require('../../data/product');
const ProductsConstructor = require('../../utils/productsConstructor')
const router = express.Router();

//Middlewares


router.get('/', (req, res) => {
    res.json(products)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = products.find(element => element.id === +id);
    if (!product) {
        return res.status(404).json({error: `Product with id: ${id} does not exist!`});
    }
    res.json(product);
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    console.log(req.body);
    if ( !title || !price || !thumbnail) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
        title,
        price: +(price),
        thumbnail,
        id: products.length + 1
    };
    products.push(newProduct);
    ProductsConstructor.save(newProduct);
    return res.json({ success: true, result: newProduct });
});

router.put('/:id', (req, res) => {
    const { params: { id }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productIndex = products.findIndex((product) => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
    const newProduct = {
        ...products[productIndex],
        title,
        price,
        thumbnail
    };
    products[productIndex] = newProduct;
    ProductsConstructor.fileSaving(products)
    return res.json({ success: true, result: newProduct});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${id} does not exist!`});
    console.log(productIndex);
    products.splice(productIndex, 1);
    ProductsConstructor.deleteById(id)
    return res.json({ success: true, result: 'product correctly eliminated' });
});

module.exports = router;