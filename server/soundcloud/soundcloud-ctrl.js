var soundcloudModel = require('./soundcloud-model.js');

var search = function (req, res) {
	console.log('inside soundcloud-ctrl.js search controller');
	soundcloudModel.search(req.query)
	.then(function(data) {
		res.status(200).json(data);
	});
}

module.exports = {
	search: search
}
