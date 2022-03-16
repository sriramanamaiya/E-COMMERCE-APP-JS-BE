const Cart = require('../models/Cart')
const cartController = {}

// CREATE
cartController.create = async (req, res) => {
    const productId = req.params.productId
    const newCart = new Cart({ ...req.body, productId: productId })
    try {
        const savedCart = await newCart.save()
        if (savedCart) {
            Cart.findById(savedCart._id)
                .populate('userId', '-password')
                .populate('productId')
                .exec(function (err, data) {
                    if (err) {
                        res.json(data)
                    } else {
                        res.json(data)
                    }
                })
        }
    } catch (err) {
        res.json(err)
    }
}

// DELETE
cartController.destroy = async (req, res) => {
    try {
        const deleteCartItem = await Cart.findByIdAndDelete(req.params.id)
        res.json(deleteCartItem)
    } catch (err) {
        res.json(err)
    }
}

//GET ALL
cartController.list = async (req, res) => {
    Cart.find({ userId: req.tokenInfo.id })
        .populate('userId', '-password')
        .populate('productId')
        .exec(function (err, data) {
            if (err) {
                res.json(data)
            } else {
                res.json(data)
            }
        })
}

module.exports = cartController
