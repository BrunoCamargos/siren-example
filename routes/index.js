var express = require('express');
var router = express.Router();
var Achelous = require('achelous');

router.get('/', function(req, res) {
	var result = new Achelous("index");

	// result.addEntity({
	// 	class: ["categories",
	// 		"collection"
	// 	],
	// 	rel: "http://siren-example.herokuapp.com/categories",
	// 	href: "http://siren-example.herokuapp.com/categories"
	// });

	result.addLink("self", "http://siren-example.herokuapp.com/");
	result.addLink("categories", "http://siren-example.herokuapp.com/categories");
	res.status(200).send(result);
});


// router.get('/:id', function(req, res) {
// 	res.status(200).send({
// 		"class": ["category"],
// 		"properties": {
// 			"id": "55283b52c585b0e41af6bc24",
// 			"name": "Nome qquer"
// 		},
// 		"links": [{
// 			"rel": ["self"],
// 			"href": "https://siren-example.herokuapp.com/55283b52c585b0e41af6bc24"
// 		}, {
// 			"rel": ["collection"],
// 			"href": "https://siren-example.herokuapp.com/"
// 		}],
// 		"actions": [{
// 			"name": "add-item",
// 			"method": "POST",
// 			"href": "https://siren-example.herokuapp.com/",
// 			"title": "add category",
// 			"type": "application/json",
// 			"fields": [{
// 				"name": "name",
// 				"type": "text",
// 			}]
// 		}]
// 	});
// });


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