'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Question = require('../models/questions');
const passport = require('passport');
const LinkedList = require('../linkedList');
//const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const seedData = require('../db/seed/questions.json');
const { updatePosition } = require('../linkedList');

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.get('/questions', jwtAuth, (req, res, next) => {
	User.findById(req.user.id)
		.then(response => {
			let result = response.questions.head.value;
			console.log(result);
			res.json(result);
		})
		.catch(err => {
			next(err);
		});
});

router.post('/questions', jwtAuth, (req, res, next) => {
	let result = {
		feedback: 'You got it!',
		totalTries: 0,
		correctTries: 0
	};
	console.log(req.body);
	User.findById(req.user.id)
		.then(answer2 => {
			let questions = answer2.questions;
			result.totalTries = questions.head.value.totalTries;
			result.correctTries = questions.head.value.correctTries;
			result.answer = questions.head.value.answer;
			console.log('answer2.questions.head.value.answer: ',answer2.questions.head.value.answer);
			console.log('req.body.answer: ',req.body.answer);
			if (answer2.questions.head.value.answer === req.body.answer) {
				questions = updatePosition(questions, questions.head.value.mValue * 2);
				result.correctTries++;
				result.totalTries++;
			} else {
				questions = updatePosition(questions, 1);
				result.feedback = 'Sorry try again';
				result.totalTries++;
			}

			return User.findByIdAndUpdate(req.user.id, { $set: { questions } });
		})
		.then(() => {
			res.json(result);
			console.log(result);
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;