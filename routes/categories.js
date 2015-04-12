var express = require('express');
var router = express.Router();
var Achelous = require('achelous');
var db = require('mongoose');

require('../models/category');
var categories = db.model('Category');

router.get('/', function(req, res, next) {
	categories.find({}, function(err, data) {
		if (err) {
			next(err);
		} else {

			// console.log(data[0]._id);
			var result = new Achelous('categories');

			var i = 0;
			for (i; i < data.length; i++) {
				result.addEntity({
					class: ['category'],
					properties: {
						id: data[i]._id,
						name: data[i].name
					},
					rel: 'item',
					title: data[i].name,
					links: [{
						rel: 'self',
						title: data[i].name,
						href: 'http://siren-example.herokuapp.com/categories/' + data[i]._id
					}]
				});
			}

			result.addLink('self', 'http://siren-example.herokuapp.com/categories/');
			res.status(200).send(result);
		}
	});
});

router.get('/:id', function(req, res) {
	categories.findById(req.params.id).exec(function(err, category) {
		if (err) {
			next(err);
		} else {
			if (category) {
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

				res.status(200).send(result);
			} else {
				var err = new Error('Category Not Found');
				err.status = 404;
				next(err);
			}
		}
	});
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var newCategory = new categories({
		name: req.body.name
	});

	newCategory.save(function(err, data) {
		if (err) {
			next(err);
		} else {
			res.status(201).send(data);
		}
	});
});



// /* GET users listing. */
// router.get('/', function(req, res, next) {

// 	var result = new Achelous('categories', {
// 		firstName: 'Joe',
// 		lastName: 'Customer'
// 	});

// 	result.addEntity({
// 		class: ['order',
// 			'collection'
// 		],
// 		rel: 'http://foo.bar.com/orders',
// 		href: 'http://myserver.com/api/orders'
// 	});

// 	result.addLink('self', 'http://myserver.com/api/customers/1234');
// 	result.addLink('account', 'http://myserver.com/lookup/account.json?customer=1234');
// 	result.addLink('lastOrder', 'http://myserver.com/api/customers/1234/orders?filter=last');
// 	res.set('Content-Type', 'application/vnd.siren+json');
// 	res.status(200).send(result);
// });

module.exports = router;