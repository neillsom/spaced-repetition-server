'use strict';

const express = require('express');

const User = require('../models/user');
const Question = require('../models/question');

const router = express.Router();

router.get('/', (req, res, next) => {
	User.find({})
		.sort('name')
		.then(results => {
			res.json(results);
		})
		.catch(next);
});

router.post('/users', (req, res, next) => {
	const requiredFields = ['username', 'password'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		const err = new Error(`Missing '${missingField}' in request body`);
		err.status = 422;
		return next(err);
	}

	const stringFields = ['username', 'password', 'firstname', 'lastname'];
	const nonStringField = stringFields.find(
		field => field in req.body && typeof req.body[field] !== 'string'
	);

	if (nonStringField) {
		const err = new Error(`Field: '${nonStringField}' must be type String`);
		err.status = 422;
		return next(err);
	}

	const explicityTrimmedFields = ['username', 'password'];
	const nonTrimmedField = explicityTrimmedFields.find(
		field => req.body[field].trim() !== req.body[field]
	);

	if (nonTrimmedField) {
		const err = new Error(
			`Field: '${nonTrimmedField}' cannot start or end with whitespace`
		);
		err.status = 422;
		return next(err);
	}

	const sizedFields = {
		username: { min: 1 },
		password: { min: 8, max: 72 },
	};

	const tooSmallField = Object.keys(sizedFields).find(
		field =>
			'min' in sizedFields[field] &&
			req.body[field].trim().length < sizedFields[field].min
	);
	if (tooSmallField) {
		const min = sizedFields[tooSmallField].min;
		const err = new Error(
			`Field: '${tooSmallField}' must be at least ${min} characters long`
		);
		err.status = 422;
		return next(err);
	}

	const tooLargeField = Object.keys(sizedFields).find(
		field =>
			'max' in sizedFields[field] &&
			req.body[field].trim().length > sizedFields[field].max
	);

	if (tooLargeField) {
		const max = sizedFields[tooLargeField].max;
		const err = new Error(
			`Field: '${tooLargeField}' must be at most ${max} characters long`
		);
		err.status = 422;
		return next(err);
	}

	// Username and password were validated as pre-trimmed
	let { username, password, firstname = '', lastname = '' } = req.body;
	firstname = firstname.trim();
	lastname = lastname.trim();

	const userData = {
		username,
		firstname,
		lastname,
	};

	// Remove explicit hashPassword if using pre-save middleware
	User.hashPassword(password)
		.then(digest => {
			userData.password = digest;
			return Promise.all([User.create(userData), Question.find()]);
		})
		.then(([user, questions]) => {
			user.questions = questions.map((q, i) => ({
				image: q.image,
				colloquial: q.colloquial,
				answer: q.answer,
				next: i === questions.length - 1 ? null : i + 1,
			}));
			return user.save();
		})
		.then(user => {
			return res.status(201).location(`/api/users/${user.id}`).json(user);
		})
		.catch(err => {
			if (err.code === 11000) {
				err = new Error('The username already exists');
				err.status = 400;
			}
			next(err);
		});
});

module.exports = router;
