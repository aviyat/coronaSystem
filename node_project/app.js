const express = require('express')
const rout = require('express').Router()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
const router = require('./router/api')
const app = express()
env.config()
app.use(bodyParser.json())
const { Router } = require('express')
const member = require('./models/member')


const userScema = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.CONNECT_DB, userScema)

    .then(() => { console.log('connect to the mongo'); })
    .catch((err) => { console.log('error:' + err); })


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriztion");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/', router)
app.listen(3500, () => { console.log("connect to port 3500"); })
