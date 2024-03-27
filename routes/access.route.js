const express = require('express');
const router = express.Router();

const accessTokenRenew = require('../controllers/accessTokenRenew.controller.js');
router.get('/', accessTokenRenew)

module.exports = router;