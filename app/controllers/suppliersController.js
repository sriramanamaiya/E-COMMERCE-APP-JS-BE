const Supplier = require('../models/Supplier')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const suppliersController = {}

suppliersController.register = async (req, res) => {
    const newSupp = new Supplier(req.body)

    try {
        const savedSupp = await newSupp.save()
        res.json(savedSupp)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

suppliersController.login = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ email: req.body.email })

        if (!supplier) {
            res.json({
                errors: 'Invalid Email ID or Password'
            })
        } else {
            bcrpyt.compare(req.body.password, supplier.password).then((match) => {
                if (match) {
                    const accessToken = jwt.sign(
                        { id: supplier._id, isAdmin: supplier.isAdmin },
                        process.env.JWT_SUPP_KEY,
                        { expiresIn: '1d' }
                    )
                    const { password, ...others } = supplier._doc
                    res.json({ ...others, accessToken })
                } else {
                    res.json({
                        errors: 'Invalid Email ID or Password'
                    })
                }
            })
        }
    } catch (err) {
        res.json(err)
    }
}

suppliersController.update = async (req, res) => {
    delete req.body.password

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.json(updatedSupplier)
    } catch (err) {
        res.json(err)
    }
}

//DELETE
suppliersController.destroy = async (req, res) => {
    try {
        const deletedProduct = await Supplier.findByIdAndDelete(req.params.id)
        res.json(deletedProduct)
    } catch (err) {
        res.json(err)
    }
}

//GET USER BY ID
suppliersController.show = async (req, res) => {
    try {
        const supp = await Supplier.findById(req.params.id)
        const { password, ...others } = supp._doc
        res.json(others)
    } catch (err) {
        res.json(err)
    }
}

module.exports = suppliersController
