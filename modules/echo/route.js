const path = require('path');
const express = require('express');
const { check, validationResult } = require('express-validator');
const outputToConsole = require('../../shared/outputToConsole');
const redisStorage = require('../../shared/RedisStorage');
const toUnix = require('../../shared/toUnixTime');
const EchoCtrl = require('./controller');
const echo = new EchoCtrl(redisStorage, outputToConsole);

const router = express.Router();
const pathToHTMLPage = path.resolve(__dirname, './page.html');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

const scheduleMessage = (req, res) => {
  try {
    echo.registerMsg(req.body);
  } catch (error) {
    throw new Error(`From echo route ${error}`, error);
  }
  return res.json({ success: true });
};


router.get('/echo-at-time', (req, res) => res.sendFile(pathToHTMLPage));
router.post('/echo-at-time',
  [
    check('message').isString().trim(),
    check('time').customSanitizer(toUnix),
  ], validateRequest, scheduleMessage);

module.exports = router;
