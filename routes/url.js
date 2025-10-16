const express = require('express');
const router = express.Router();
const {handlepostrequest, handlegetanalytics} = require('../controllers/url');


router.post('/', handlepostrequest);

router.get('/analytics/:shortid', handlegetanalytics);

module.exports = router;