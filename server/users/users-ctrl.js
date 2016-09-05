var User = require('./users-model.js');

module.exports = {

	//sign in (no password encryption yet)
	signin: function (req, res) {
		console.log('inside users-ctrl.js signin controller');
		User.findOne({ username: req.body.username, password: req.body.password },
		function(error, data) {
			if(!data) {
				res.status(500).send();
			} else {
				res.status(201).json(data);
			}
		});
	},

	//sign in (no password encryption yet)
	signup: function (req, res) {
		console.log('inside users-ctrl.js signup controller');
		User.findOne({ username: req.body.username },
		function(error, data) {
			if(!data) {
				var newUser = new User(req.body);
				newUser.save(function (error, post) {
					if (error) {
						res.send(error);
					} else {
						res.status(201).json(post);
					}
				});
			} else {
				res.status(500).send();
			}
		});
	},

	//gets all users in db (for testing only)
	getAllUsers: function(req, res) {
		console.log('inside users-ctrl.js getAllUsers controller');
		User.find(function(error, data) {
			if(error) {
				res.send(error);
			} else {
				res.status(200).json(data);
			}
		});
	}

}
