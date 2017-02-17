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

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Invalid endpoint");
});

app.listen(port, () => {
    console.log("Server started on port: "+port);
});
