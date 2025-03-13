const express= require('express');
const router= express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');

// Create a User using: POST '/api/auth'
router.post('/',[
    body('name', 'invalid name').isLength({min: 3}),
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password').isLength({min: 8})
], (req, res)=>
    {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
    }
    User.create(
        {name: req.body.name,
        password: req.body.password,
        email: req.body.email}
    ).then(user=> res.json(user))
} )

module.exports = router;