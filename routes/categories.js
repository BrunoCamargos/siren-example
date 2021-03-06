var express = require('express');
var router = express.Router();
var Achelous = require('achelous');
var db = require('mongoose');

require('../models/category');
var categories = db.model('Category');

router.get('/', function(req, res, next) {
	getAndSendAll(res);
});

function getAndSendAll(res) {
	categories.find({}, function(err, categories) {
		if (err) {
			next(err);
		} else {
			res.status(200).send(createCategoriesResult(categories));
		}
	});
}

function createCategoriesResult(categories) {
	var result = new Achelous('categories');
	var i = 0;
	for (i; i < categories.length; i++) {
		result.addEntity({
			class: ['category'],
			properties: {
				id: categories[i]._id,
				name: categories[i].name
			},
			rel: 'item',
			title: categories[i].name,
			links: [{
				rel: 'self',
				title: categories[i].name,
				href: 'http://siren-example.herokuapp.com/categories/' + categories[i]._id
			}]
		});
	}

	result.addAction({
		name: 'add-category',
		method: 'POST',
		href: 'http://siren-example.herokuapp.com/categories/',
		title: 'Add Category',
		type: 'application/json',
		fields: [{
			name: 'name',
			type: 'text',
			title: 'Category name'
		}]
	});

	result.addLink('self', 'http://siren-example.herokuapp.com/categories/');

	return result;
}

router.get('/:id', function(req, res) {
	categories.findById(req.params.id).exec(function(err, category) {
		if (err) {
			next(err);
		} else {
			if (category) {
				res.status(200).send(createCategoryResult(category));
			} else {
				var err = new Error('Category Not Found');
				err.status = 404;
				next(err);
			}
		}
	});
});

function createCategoryResult(category) {
	var result = new Achelous('category', {
		id: category._id,
		name: category.name
	});

	result.addEntity({
		class: ['categories', 'collection'],
		title: 'Categories',
		rel: 'categories',
		links: [{
			rel: 'self',
			href: 'http://siren-example.herokuapp.com/categories/'
		}]
	});

	result.addLink('self', 'http://siren-example.herokuapp.com/categories/' + category._id);
	result.addLink('categories', 'http://siren-example.herokuapp.com/categories/');

	result.addAction({
		name: 'del-category',
		method: 'DELETE',
		href: 'http://siren-example.herokuapp.com/categories/' + category._id,
		title: 'Delete Category'
		// type: 'application/json',
		// fields: [{
		// 	name: 'id',
		// 	type: 'text',
		// 	title: 'Category ID',
		// 	value: category._id
		// }]
	});

	result.addAction({
		name: 'update-category',
		method: 'PUT',
		href: 'http://siren-example.herokuapp.com/categories/' + category._id,
		title: 'Update Category',
		// type: 'application/json',
		fields: [{
			name: 'name',
			type: 'text',
			title: 'Category name',
			value: category.name
		}]
	});

	return result;
}

router.post('/', function(req, res, next) {
	var newCategory = new categories({
		name: req.body.name
	});

	newCategory.save(function(err, category) {
		if (err) {
			next(err);
		} else {
			res.status(201).send(createCategoryResult(category));
		}
	});
});

router.delete('/:id', function(req, res, next) {
	categories.remove({
		'_id': req.params.id
	}, function(err, data) {
		if (err) {
			next(err);
		} else {
			// console.log(data.result.ok);
			// console.log(data.result.n);
			getAndSendAll(res);
		}
	});
});

router.put('/:id', function(req, res, next) {
	categories.update({
		'_id': req.params.id
	}, {
		'name': req.body.name
	}, function(err, data) {
		if (err) {
			next(err);
		} else {
			// console.log(data.ok);
			// console.log(data.n);
			// console.log(data.nModified);
			getAndSendAll(res);
		}
	});
});

module.exports = router;