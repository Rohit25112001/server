const express = require('express');
const router = express.Router();

const { signup, login, logout, remove } =  require('../controllers/user.controller');

router.post('/signup',signup);
router.get('/login',login);
router.get('/logout',logout);
router.delete('/remove',remove);

module.exports = router;