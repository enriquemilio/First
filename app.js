/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// Confirm database connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: '+config.database);
});

// Check if there is a connection error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

const app = express();
const port = 3000;

const users = require('./routes/users');

//Cors Middleware - To allow access from othe domain names
app.use(cors());

// Set Static folder for public
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Add passport middlewear
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Handle request to users/*
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send("Invalid endpoint");
});

// Start Server
app.listen(port, () => {
    console.log("Server started on port: "+port);
});
