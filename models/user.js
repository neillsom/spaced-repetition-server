'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String, dafault: '' },
		lastname: { type: String, dafault: '' },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		questions: [
			{
				image: { type: String, required: true },
				answer: { type: String, required: true },
				score: { type: Number, default: 0 },
				total: { type: Number, default: 0 },
				mValue: { type: Number, default: 1 },
        colloquial: { type: String, required: true },
				next: { type: Number, default: null },
			},
		],
		head: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

userSchema.set('toObject', {
	transform: function (doc, ret) {
		ret.id = ret._id;
    delete ret.questions;
    delete ret.head;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
	},
});

userSchema.methods.validatePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
