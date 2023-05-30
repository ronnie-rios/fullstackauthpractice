const jwt = require('jsonwebtoken');

//middleware checks the usertoken cookie should be present inside
//of the cookies obj of req with the secret
//if not unauth
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false })
        } else {
            next()
        }
    })
}