const jwt = require('jsonwebtoken')
const JWT_SECRET = 'thisisjwtsecretkey'


const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token")
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(401).json({ msg: "No token, authorization denied" })
    }
}

module.exports = fetchuser;