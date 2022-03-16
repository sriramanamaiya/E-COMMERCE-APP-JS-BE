const Order = require('../models/Order')
const orderController = {}

// CREATE
orderController.create = async (req, res) => {
    const cartId = req.params.cartId
    const newOrder = new Order({ ...req.body, cartId: cartId })
    try {
        const savedOrder = await newOrder.save()
        if (savedOrder._id) {
            Order.findById(savedOrder._id)
                .populate('cartId')
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

//UPDATE
orderController.update = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.json(updatedOrder)
    } catch (err) {
        res.json(err)
    }
}

// DELETE
orderController.destroy = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        res.json(order)
    } catch (err) {
        res.json(err)
    }
}

//GET USER ORDERS
orderController.list = async (req, res) => {
    try {
        const order = await Order.find()
        res.json(order)
    } catch (err) {
        res.json(err)
    }
}

//GET ALL ORDERS
orderController.show = async (req, res) => {
    Order.findById(req.params.id)
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = orderController
