const express = require('express');
const router = express.Router();
const {mongoose} = require('../db');
const {Series} = require('../models/Series');

router.get('/', (req, res) => {
	return res.json('API is healthy');
});

module.exports = router;
