const express = require('express');
const router = express.Router();

const accessTokenRenew = require('../controllers/user/accessTokenRenew.controller');
router.get('/', accessTokenRenew)

module.exports = router;