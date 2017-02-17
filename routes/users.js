/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const router = express.Router();

// Register
router.get('/register', (req, res) => {
    res.send('REGISTER');
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