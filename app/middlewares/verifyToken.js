const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    const auth = req.headers.token
    const token = auth.split(' ')[1]
    let tokenData
    try {
        tokenData = jwt.verify(token, process.env.JWT_KEY)
        req.tokenInfo = tokenData
        next()
    } catch (error) {
        res.json(error.message)
    }
}

const authenticateAdmin = (req, res, next) => {
    const auth = req.headers.token
    const token = auth.split(' ')[1]
    let tokenData
    try {
        tokenData = jwt.verify(token, process.env.JWT_SUPP_KEY)
        req.tokenInfo = tokenData
        next()
    } catch (error) {
        res.json(error.message)
    }
}

const verifyAdmin = (req, res, next) => {
    const tokenData = req.tokenInfo
    if (tokenData.isAdmin) {
        next()
    } else {
        res.json({
            errors: 'Access Denied',
        })
    }
}

module.exports = {
    authenticateUser,
    authenticateAdmin,
    verifyAdmin,
}
