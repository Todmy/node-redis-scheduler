const path = require('path');
const express = require('express');
const router = express.Router();

const pathToHTMLPage = path.resolve(__dirname, './page.html');

router.get('/echo-at-time', (req, res) => res.sendFile(pathToHTMLPage));
router.post('/echo-at-time', (req, res) => res.sendFile(pathToHTMLPage));

module.exports = router;
