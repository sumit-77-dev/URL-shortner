const URL = require('../models/url');
const shortid = require('shortid');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


async function handlepostrequest(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'id required'});
    const shorturl = shortid();
    const result = await URL.create({
        shortid: shorturl,
        redirectid: body.url,
        visitedhistorty: [],
        createdBY: req.user._id
    })

    res.render('pages/index.ejs', {
        id: shorturl
    });
}

async function handlegetanalytics(req, res) {
    const shortid = req.params.shortid;
    const result = await URL.findOne({shortid});

    res.json({
            totalclicks: result.visitedhistory.length,
            analytics: result.visitedhistory,
        }
    );
};


module.exports = {
    handlepostrequest,
    handlegetanalytics
};
