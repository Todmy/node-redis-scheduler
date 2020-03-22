const express = require('express');
const router = express.Router();

const statusMonitor = require('express-status-monitor')();
const { route: echoRoute } = require('./modules/echo');

router.use(echoRoute);
router.use(statusMonitor);

module.exports = router;
