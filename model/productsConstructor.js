const fs = require('fs')
const products = require('../data/product')

class ProductsConstructor{
    static lastProductId = products[products.length - 1].id;

    constructor() {
        this.list = products;
    }

    getAll() {
        return this.list;
    }

    getById(productId) {
        console.log(productId);
        return this.list.find(product => product.id === +productId);
    }

    save(product) {
        const { nombre, descripcion, precio, imagen } = product;
            if ( !nombre || !descripcion || !precio || !imagen) {
        return null;
    }
    Products.lastProductId++;
    const newProduct = {
        id: Products.lastProductId,
        nombre,
        descripcion,
        precio,
        imagen
    };
    this.list.push(newProduct);
    return newProduct;
    };

    updateById(productId, product) {
        const productIndex = this.list.findIndex((producto) => producto.id === +productId);
            if (productIndex < 0) return null;
        const {
            nombre,
            descripcion,
            precio,
            imagen
        } = product;
        const updatedProduct = {
            id: this.list[productIndex].id,
            nombre,
            descripcion,
            precio,
            imagen
        };
        this.list[productIndex] = updatedProduct;
        return updatedProduct;
    }

    deleteById(productId) {
        const productIndex = this.list.findIndex((producto) => producto.id === +productId);
        if (productIndex < 0) return null;
        return this.list.splice(productIndex, 1);
    }
}


module.exports = ProductsConstructor;
