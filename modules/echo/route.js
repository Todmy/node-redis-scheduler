const path = require('path');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const pathToHTMLPage = path.resolve(__dirname, './page.html');

router.get('/echo-at-time', (req, res) => res.sendFile(pathToHTMLPage));

router.post('/echo-at-time',
  [
    check('message').isString().trim(),
    check('time').customSanitizer(value => new Date(value)),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return res.json({ success: true });
  });

module.exports = router;
