const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middlewares/fetchuser')

const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'thisisjwtsecretkey'


// ROUTE 1 : for creating a new user 

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // Using express-validator to validate the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // Check if the user already exists
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Sorry, a user with this email already exists' }] })
        }

        //Generating a hashed password with a salt 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Creating a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        // Assigning an authtoken to the new user
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // Sending the success status and authtoken in the response
        res.json({
            success: true,
            authtoken: authtoken
        })

    } catch (err) {
        res.status(500).send('Some error occured')
        console.log(err.message)
    }
})



// ROUTE 2 : for logging in an existing user

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 5 characters').exists()
], async (req, res) => {

    // Using express-validator to validate the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {

        // Matching the email address
        let user = await User.findOne({ email }) // User.findOne returns a promise 
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Kindly login with the correct credentials' }] })
        }

        // Comparing the password
        const passwordCompare = await bcrypt.compare(password, user.password) // bcrypt.compare returns a promise 
        if (!passwordCompare) {
            return res.status(400).json({ errors: [{ msg: 'Kindly login with the correct credentials' }] })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({
            success: true,
            authtoken: authtoken
        })

    } catch (err) {
        res.status(500).json({
            success: false, 
            message: 'Some error occured'
        })
        console.log(err.message)
    }
})


// ROUTE 3 : for logging in an existing user

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')

        res.send(user)

    } catch (err) {
        res.status(500).send('Some error occured')
        console.log(err.message)
    }
})

module.exports = router