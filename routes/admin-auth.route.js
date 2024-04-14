const express = require('express');
const router = express.Router();
const { create , login} = require('../controllers/admin/admin.controller');

const ipcheck = require('../middleware/checkip.middleware');

router.post('/signup', ipcheck, create)
router.get('/login', ipcheck, login)

module.exports = router;