'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CategorySchema = new Schema({
	id: {
		type: Schema.ObjectId
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	}
});

mongoose.model('Category', CategorySchema);