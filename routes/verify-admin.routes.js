const express = require('express');
const checkAuthToken = require('../middleware/admin-verify.middleware');
const adminAT = require('../controllers/admin/admin-verify.controller');
const router = express.Router();

router.get('/', checkAuthToken, adminAT)

module.exports = router;