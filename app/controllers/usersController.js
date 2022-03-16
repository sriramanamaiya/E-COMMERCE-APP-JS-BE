const User = require('../models/Users')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersController = {}

usersController.register = async (req, res) => {
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

usersController.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            res.json({
                errors: 'Invalid Email ID or Password',
            })
        } else {
            bcrpyt.compare(req.body.password, user.password).then((match) => {
                if (match) {
                    const accessToken = jwt.sign(
                        { id: user._id, isAdmin: user.isAdmin },
                        process.env.JWT_KEY,
                        { expiresIn: '1d' }
                    )
                    const { password, ...others } = user._doc
                    res.json({ ...others, accessToken })
                } else {
                    res.json({
                        errors: 'Invalid Email ID or Password',
                    })
                }
            })
        }
    } catch (err) {
        res.json(err)
    }
}

usersController.update = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_WORD).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )
        res.json(updatedUser)
    } catch (err) {
        res.json(err)
    }
}

//DELETE
usersController.destroy = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch (err) {
        res.json(err)
    }
}

//GET USER BY ID
usersController.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        res.json(user)
    } catch (err) {
        res.json(err)
    }
}

module.exports = usersController
