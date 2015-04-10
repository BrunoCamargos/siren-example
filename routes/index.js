var express = require('express');
var router = express.Router();
var Achelous = require('achelous');

/* GET users listing. */
router.get('/', function(req, res, next) {

	var result = new Achelous("customer", {
		firstName: "Joe",
		lastName: "Customer"
	});

	result.addEntity({
		class: ["order",
			"collection"
		],
		rel: "http://foo.bar.com/orders",
		href: "http://myserver.com/api/orders"
	});

	result.addLink("self", "http://myserver.com/api/customers/1234");
	result.addLink("account", "http://myserver.com/lookup/account.json?customer=1234");
	result.addLink("lastOrder", "http://myserver.com/api/customers/1234/orders?filter=last");
	res.set('Content-Type', 'application/vnd.siren+json');
	res.status(200).send(result);
});

module.exports = router;