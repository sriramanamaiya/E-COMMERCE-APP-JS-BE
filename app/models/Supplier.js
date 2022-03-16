const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const Schema = mongoose.Schema

const supplierSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is mandatory'],
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
        password: {
            type: String,
            required: [true, 'Password is mandatory'],
            minlength: 8,
            maxlength: 128,
        },
        isAdmin: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

supplierSchema.pre('save', function (next) {
    const supplier = this
    bcrpyt
        .genSalt()
        .then((salt) => {
            bcrpyt
                .hash(supplier.password, salt)
                .then((hashedPassword) => {
                    supplier.password = hashedPassword
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

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier
