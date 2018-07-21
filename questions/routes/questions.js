'use strict';

const express = require('express');

const Question = require('../../questions/questions');

const router = express.Router();

router.get('/', (req, res, next) => {
	Question.find()
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			console.error(err);
			next(err);
		});
});

module.exports = router;