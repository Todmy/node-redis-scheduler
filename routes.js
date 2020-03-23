const express = require('express');
const router = express.Router();

const statusMonitor = require('express-status-monitor')();
const echoRoute = require('./modules/echo/route');

router.use(echoRoute);
router.use(statusMonitor);

module.exports = router;
