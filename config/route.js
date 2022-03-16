const express = require('express')
const router = express.Router()
const { authenticateUser, verifyAdmin, authenticateAdmin } = require('../app/middlewares/verifyToken')
const usersController = require('../app/controllers/usersController')
const suppliersController = require('../app/controllers/suppliersController')
const productController = require('../app/controllers/productController')
const cartController = require('../app/controllers/cartController')
const orderController = require('../app/controllers/orderController')

const addressController = require('../app/controllers/addressController')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)

router.put('/users/:id', authenticateUser, usersController.update)
router.get('/users/:id', authenticateUser, usersController.show)
router.delete('/users/:id', authenticateUser, usersController.destroy)

router.post('/suppliers/register', suppliersController.register)
router.post('/suppliers/login', suppliersController.login)

router.put('/suppliers/:id', authenticateAdmin, verifyAdmin, suppliersController.update)
router.get('/suppliers/:id', authenticateAdmin, verifyAdmin, suppliersController.show)
router.delete('/suppliers/:id', authenticateAdmin, verifyAdmin, suppliersController.destroy)

router.post('/product/:supplierId', authenticateAdmin, verifyAdmin, productController.create)
router.put('/product/:id', authenticateAdmin, verifyAdmin, productController.update)
router.get('/product/:id', authenticateUser, productController.show)
router.get('/product/', productController.list) // authenticateUser, //not required
router.delete('/product/:id', authenticateAdmin, verifyAdmin, productController.destroy)

router.post('/cart/:productId', authenticateUser, cartController.create)
router.get('/cart/', authenticateUser, cartController.list)
router.delete('/cart/:id', authenticateUser, cartController.destroy)

router.post('/suppAddress/register', authenticateUser, addressController.register)
router.post('/addaddress', authenticateUser, addressController.create)
router.get('/addresses', authenticateUser, addressController.show)
router.delete('/address/:id', authenticateUser, addressController.destroy)

router.post('/orders/:cartId', authenticateUser, orderController.create)
router.put('/orders/:id', authenticateUser, orderController.update)
router.get('/orders/:id', authenticateUser, orderController.show)
router.get('/orders', authenticateUser, orderController.list)
router.delete('/orders/:id', authenticateUser, orderController.destroy)

module.exports = router
