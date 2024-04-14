const express = require('express');
const router = express();
const admin_access_token_renew = require('../controllers/admin/accessTokenRenew.controller');
const admin_verify = require('../middleware/admin-verify.middleware');

router.get('/', admin_verify, admin_access_token_renew)

module.exports = router;