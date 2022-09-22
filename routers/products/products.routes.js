const express = require('express');
const ProductsConstructor = require('../../model/productsConstructor')
const router = express.Router();

const ProductsCons = new ProductsConstructor();
router.get('/', (req, res) => {
    res.send(ProductsCons.getAll())
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = ProductsCons.list.find(element => element.id === +id);
    if (!product) {
        return res.status(404).json({error: `Product with id: ${id} does not exist!`});
    }
    res.send(ProductsCons.getById(id))
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
    products.list.push(newProduct);
    ProductsCons.save(newProduct);
    return res.json({ success: true, result: newProduct });
});

router.put('/:id', (req, res) => {
    const { params: { id }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productIndex = products.list.findIndex((product) => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
    const newProduct = {
        ...products[productIndex],
        title,
        price,
        thumbnail
    };
    products.list[productIndex] = newProduct;
    ProductsCons.fileSaving(products)
    return res.json({ success: true, result: newProduct});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.list.findIndex(product => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${id} does not exist!`});
    console.log(productIndex);
    products.list.splice(productIndex, 1);
    ProductsCons.deleteById(id)
    return res.json({ success: true, result: 'product correctly eliminated' });
});

module.exports = router;