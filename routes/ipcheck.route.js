const express = require('express');
const router = express.Router();

const ipcheck = require('../controllers/ipcheck.controller.js');
const middlewareIpcheck = require('../middleware/checkip.middleware.js');

router.get('/', ipcheck);
module.exports = router;