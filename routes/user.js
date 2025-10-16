const express = require('express');
const { handlesignin, handlelogin } = require('../controllers/user')

const router = express.Router();

router.post('/', handlesignin);

router.post('/login', handlelogin);

module.exports = router;