const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const Schema = mongoose.Schema

const usersSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: 5,
            maxlength: 64,
        },
        email: {
            type: String,
            required: [true, 'Email ID is mandatory'],
            unique: true,
            validate: {
                validator: function (value) {
                    return isEmail(value)
                },
                message: function () {
                    return 'Invalid Email ID'
                },
            },
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
        },
        gender: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            maxlength: 128,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

usersSchema.pre('save', function (next) {
    const user = this
    bcrpyt
        .genSalt()
        .then((salt) => {
            bcrpyt
                .hash(user.password, salt)
                .then((hashedPassword) => {
                    user.password = hashedPassword
                    next()
                })
                .catch((error) => {
                    res.json(error)
                })
        })
        .catch((error) => {
            res.json(error)
        })
})

const User = mongoose.model('Users', usersSchema)

module.exports = User
