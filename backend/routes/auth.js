const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating auth tokens
const fetchuser= require('../middleware/fetchUser');

const JWT_SECRET = 'your_jwt_secret_key';

//Route 1- Create a User using: POST '/api/auth/createuser'. Login not required.
router.post(
    '/createuser',
    [
        body('name', 'Invalid name').isLength({ min: 3 }),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Invalid password').isLength({ min: 8 })
    ],
    async (req, res) => {
        // Debugging
        // console.log("Received a request at /api/auth/createuser"); 

        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check if the email already exists
            let userExists = await User.findOne({ email: req.body.email });
            if (userExists) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Create new user
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

//Route 2- Authenticate a User using: POST '/api/auth/login'. Login not required.
router.post(
    '/login',
    [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password cannot be blank').exists()
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Enter correct email ID' });
            }

            // Compare the password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ error: 'Enter correct password' });
            }

            // Generate JWT token
            const payload = { user: { id: user.id } };
            const authToken = jwt.sign(payload, JWT_SECRET); // Expires in is optional-, { expiresIn: '1h' })

            res.json({ authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

//Route 3- Details of User after logging in using: POST '/api/auth/getuser'. Login not required.

router.post(
    '/getuser', fetchuser, async (req, res) => {
        try {
            userId= req.user.id;
            const user = await User.findById(userId).select('-password')
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');

        }
    })

module.exports = router;
