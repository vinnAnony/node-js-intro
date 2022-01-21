const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router.get('/cow1', function (req, res) {
    res.send('About cow 1')
});


router.get('/cow2', function (req, res) {
    res.send('About cow 2')
});

module.exports = router