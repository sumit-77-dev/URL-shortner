const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const url = await URL.find({createdBY: req.user._id});
    return res.render('pages/index.ejs', {
        urls: url
    })
})

router.get('/signup', async (req, res) => {
    res.render('pages/signin.ejs')
})
router.get('/login', async (req, res) => {
    res.render('pages/login.ejs')
})

module.exports = router;