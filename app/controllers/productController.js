const Product = require('../models/Product')
const productController = {}

// CREATE
productController.create = async (req, res) => {
    const supplierId = req.params.supplierId
    const newProd = new Product({ ...req.body, supplierId: supplierId })
    try {
        const savedProd = await newProd.save()
        res.json(savedProd)
    } catch (err) {
        res.json(err)
    }
}

//UPDATE
productController.update = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.json(updatedProduct)
    } catch (err) {
        res.json(err)
    }
}

// DELETE
productController.destroy = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.json(deletedProduct)
    } catch (err) {
        res.json(err)
    }
}

//GET PRODUCT BY ID
productController.show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (err) {
        res.json(err)
    }
}

//GET ALL PRODUCTS
productController.list = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.json(err)
    }
}

module.exports = productController
