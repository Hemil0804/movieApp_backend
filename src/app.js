require("dotenv").config();
require('./connection/db')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
const cors = require('cors')
const morgan = require('morgan')
const i18n = require('./i18n/i18n')
const { PORT, IS_SSL } = require('../config/key')
const https = require("https");
const server = http.createServer(app)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

server.listen(PORT, () => {
    console.log('server listening on port:', PORT)
})

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(function(req, res, next) {
    res.setHeader("X-XSS-Protection", "1");
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', `frame-src 'none'; object-src 'none'; script-src 'self'; style-src 'self';`);

    next();
});
app.set('trust proxy', 1)

// cors
app.use(cors())
app.options('*', cors())
app.use(i18n)

app.get('/', (req, res) => {
    res.send('Testing from the Movie App ')
})

const user=require('./routes/users/user.route')
app.use('/user', user)
const movie=require('./routes/movies/movie.route')
app.use('/movie', movie)