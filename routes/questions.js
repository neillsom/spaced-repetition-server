'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {
	session: false,
	failWithError: true,
});

router.get('/questions', jwtAuth, (req, res, next) => {
	User.findById(req.user.id)
		.then(user => {
			res.json(user.questions[user.head]);
		})
		.catch(err => {
			next(err);
		});
});

router.post('/questions', jwtAuth, (req, res, next) => {
	const userId = req.user.id;
	const userAnswer = req.body.answer;

	User.findById(userId)
		.then(user => {
			const currentQuestionIndex = user.head;
			const questionAnswer = user.questions[currentQuestionIndex];

			questionAnswer.total = questionAnswer.total + 1;

			let isCorrect = false;
			let feedback = "Sorry! That's the wrong answer.";

			if (userAnswer === questionAnswer.answer.toLowerCase()) {
				isCorrect = true;
				feedback = 'You got it!';
				questionAnswer.score = questionAnswer.score + 1;
				questionAnswer.mValue = questionAnswer.mValue * 2;
			} else {
				questionAnswer.mValue = 1;
			}

			let count = questionAnswer.mValue;
			let workingQuestionAnswer = user.questions[currentQuestionIndex];

			while (count && workingQuestionAnswer.next !== null) {
				workingQuestionAnswer = user.questions[workingQuestionAnswer.next];
				count--;
			}

			user.head = questionAnswer.next;
			questionAnswer.next = workingQuestionAnswer.next;
			workingQuestionAnswer.next = currentQuestionIndex;

			user.save();

			const results = {
				feedback,
				answer: questionAnswer.answer,
				correct: isCorrect,
				score: questionAnswer.score,
				total: questionAnswer.total,
				mValue: questionAnswer.mValue,
			};

			return res.json(results);
		})
		.catch(next);
});
module.exports = router;
