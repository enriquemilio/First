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
const config = require('../config/database');

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
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'USer not found!'});
        }
        
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT '+token, 
                    user: {
                        id: user._id,
                        name: user.name, 
                        username: user.username, 
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong Password!'});
            }
        });
    });
});

// Profile
router.get('/Profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user);
});

// Validate
router.get('/validate', (req, res) => {
    res.send('VALIDATE');
});

module.exports = router;