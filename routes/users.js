/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email, 
        username: req.body.username, 
        password: req.body.password
    });
    
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res) => {
    res.send('AUTH');
});

// Profile
router.get('/Profile', (req, res) => {
    res.send('PROFILE');
});

// Validate
router.get('/validate', (req, res) => {
    res.send('VALIDATE');
});

module.exports = router;