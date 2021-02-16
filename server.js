const express = require('express')
const server = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const confessionsRoutes = require('./routes/confessions.js')
const Log = (type, text) => {
    const symbol = type==='success'?'+':(type==='error'?'!':'~')
    var currentDate = new Date()
    var time = String(currentDate).split(' ')
    console.log(`[${time[2]}/${currentDate.getMonth()+1}/${time[3]}-${time[4]}] [${symbol}] ${text}`)  
}

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//connect to db
mongoose.connect(
    "mongodb+srv://osm:b0ujuF14yCjLolQk@anonconfess.yth2c.mongodb.net/anonconfess?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(()=>{
        Log('success', 'successfully connected to DB')
    }).catch((err)=>{
        Log('error', `an error occurred while connecting to DB : ${err}`)
    })



server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', '*')
    next();
  });


//public routes :

server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})
server.get('/create', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "create.html"))
})
server.get('/confession', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "create.html"))
})

server.use('/confessions', confessionsRoutes)



server.get('*', (req, res) => {
    const ex = req.url.split('.')[req.url.split('.').length - 1]
    const allowedExtensions = ['js', 'css', 'png', 'jpg']
    if (allowedExtensions.includes(ex)) {
        res.sendFile(path.resolve(__dirname, "public", req.url.slice(1)))
    } else {
        res.sendFile(path.resolve(__dirname, "public", "404.html"))
    }
})
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    Log('success', `Server started successfully, listening on port ${PORT}`)
    Log('detect', 'Connecting to DB, please wait...')
})