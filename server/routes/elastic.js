const express = require('express')
const router = express.Router()
const request = require('request')


router.post('/posttest', (req, res) => {
    console.log(req.body);
    return res.json({message: 'success'})
})

router.post('/getExperimentLogs', (req, res) => {
    console.log(req.body);
    return res.json({message: 'success'})
})

module.exports = router;