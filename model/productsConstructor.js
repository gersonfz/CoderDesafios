const { mariaDB } = require('../db/config')
const knex = require('knex')(mariaDB)

class ProductsConstructor {
    constructor(name) {
        this.name = name;
    }

    async save(item) {
        try {
            console.log(item);
            await knex('products').insert(item)
            console.log('Product saved successfully in the database')
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateById(item) {
        try {
            const { id, title, price, thumbnail } = item
            const productToUpdate = await knex('products').where({ id }).first()
            if (!productToUpdate) {
                console.log('Product not found in the database')
                return -1
            }
            await knex('products').where({ id }).update({ title, price, thumbnail })
            console.log('Product updated successfully in the database')
        } catch (error) {
            console.log(error)
        }
    }
    async getAll() {
        try {
            const products = await knex('products')
            console.log(products);
            if (products.length > 0) {
                console.log('All products successfully received from the database')
                return products
            }
            console.log('No products found in the database')
            return []
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async getById(itemId) {
        try {
            const product = await knex('products').where({ id: itemId }).first()
            if (product) {
                console.log('Product found successfully in the database')
                return product
            }
            console.log('Product not found in the database')
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async deleteById(itemId) {
        try {
            const productToDelete = await knex('products')
                .where({ id: itemId })
                .first()

            if (!productToDelete) {
                console.log('Product not found in the database')
                return -1
            }

            await knex('products').where({ id: itemId }).del()
            console.log('Product deleted successfully from the database')
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll () {
        try {
            await knex('products').del()
            console.log('All products deleted successfully from the database')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductsConstructor