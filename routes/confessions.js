const express = require('express')
const router = express.Router()
const {Confession, Comment} = require('./../models/confession.js')
const Log = (type, text) => {
    const symbol = type==='success'?'+':(type==='error'?'!':'~')
    var currentDate = new Date()
    var time = String(currentDate).split(' ')
    console.log(`[${time[2]}/${currentDate.getMonth()+1}/${time[3]}-${time[4]}] [${symbol}] ${text}`)  
}

// get and create confessions
router.get('/', (req, res) => {
    Log('detect', 'confession get request detected')
    Confession.find()
    .then(confessions => {
        res.status(200).type('json').json(confessions)
        Log('success', 'confession get request fulfilled')
    }).catch(err => {
        res.status(400).send('error')
        Log('error', `an error occurred while fetching confessions : ${err}`)
    })
})

router.delete('/clearAll', (req, res) => {
    Log('detect', 'clear confessions request detected...')
    Confession.deleteMany({})
    .then(() => {
        res.status(200).send('success')
        Log('success', 'all confessions cleared successfully')
    })
    .catch(err => {
        res.status(400).send('error')
        Log('error', `an error occurred while clearing confessions : ${err}`)
    })
})

router.post('/create', (req, res) => {
    Log('detect', 'confession post request detected')
    const newConfession = new Confession({
        confession: req.body.confession,
        comments: [],
        views: 0
    })
    newConfession.save().then(confession => {
        res.status(200).send('success')
        Log('success', 'confession post request fulfilled')
    }).catch(err => {
        res.status(400).send('error')
        Log('error', `an error occurred while creating confession : ${err}`)
    })
})



// create comments
router.post('/cmnts/create/:id', (req, res) => {
    Log('detect', 'comment post request detected')
    const newComment = new Comment({
        comment: req.body.comment
    })
    Confession.findById({_id: req.params.id})
    .then(confession => {
        const updated = confession
        updated.comments.push(newComment)
        updated.save()
        .then(() => {
            res.status(200).send('success')
            Log('success', 'comment get request fulfilled')
        })
        .catch(err => {
            res.status(400).send('error')
            Log('error', `an error occurred while saving comment : ${err}`)
        })
    })
    .catch(err => {
        res.status(400).send('error')
        Log('error', `an error occurred while creating comment : ${err}`)
    })
})

module.exports = router