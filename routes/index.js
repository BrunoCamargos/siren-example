var express = require('express');
var router = express.Router();
var Achelous = require('achelous');
var db = require("mongoose");

require('../models/category');
var categories = db.model('Category');

router.post('/', function(req, res, next) {
	console.log(req.body);
	var newCategory = new categories({
		name: req.body.name
	});

	newCategory.save(function(err, data) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json(data);
			res.status(201);
		}
	});
});

router.get('/', function(req, res) {
	categories.find({}, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.json(data);
			res.status(200);
		}
	});
});


router.get('/:id', function(req, res) {
	res.status(200).send({
		"class": ["category"],
		"properties": {
			"id": "55283b52c585b0e41af6bc24",
			"name": "Nome qquer"
		},
		"links": [{
			"rel": ["self"],
			"href": "https://siren-example.herokuapp.com/55283b52c585b0e41af6bc24"
		}, {
			"rel": ["collection"],
			"href": "https://siren-example.herokuapp.com/"
		}],
		"actions": [{
			"name": "add-item",
			"method": "POST",
			"href": "https://siren-example.herokuapp.com/",
			"title": "add category",
			"type": "application/x-www-form-urlencoded",
			"fields": [{
				"name": "name",
				"type": "text",
			}]
		}]
	});
});


// /* GET users listing. */
// router.get('/', function(req, res, next) {

// 	var result = new Achelous("categories", {
// 		firstName: "Joe",
// 		lastName: "Customer"
// 	});

// 	result.addEntity({
// 		class: ["order",
// 			"collection"
// 		],
// 		rel: "http://foo.bar.com/orders",
// 		href: "http://myserver.com/api/orders"
// 	});

// 	result.addLink("self", "http://myserver.com/api/customers/1234");
// 	result.addLink("account", "http://myserver.com/lookup/account.json?customer=1234");
// 	result.addLink("lastOrder", "http://myserver.com/api/customers/1234/orders?filter=last");
// 	res.set('Content-Type', 'application/vnd.siren+json');
// 	res.status(200).send(result);
// });

module.exports = router;