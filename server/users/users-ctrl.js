var User = require('./users-model.js');

module.exports = {

	//sign in (no password encryption yet)
	signin: function (req, res) {
		console.log('inside users-ctrl.js signin');
		User.findOne({ username: req.body.username, password: req.body.password },
		function(err, post) {
			if(err) {
				console.log('err signing in: ', err);
				res.send(err);
			}
			else if(!post) {
				res.status(500).send();
			} else {
				res.status(201).json(post._id);
			}
		});
	},

	//sign in (no password encryption yet)
	signup: function (req, res) {
		console.log('inside users-ctrl.js signup');
		User.findOne({ username: req.body.username },
		function(err, data) {
			if(!data) {
				var newUser = new User(req.body);
				newUser.save(function (err, post) {
					if (err) {
						console.log('err signing up: ', err);
						res.send(err);
					} else {
						res.status(201).json(post._id);
					}
				});
			} else {
				res.status(500).send();
			}
		});
	},

	//gets all users in db (for testing only)
	getAllUsers: function(req, res) {
		console.log('inside users-ctrl.js getAllUsers');
		User.find(function(err, data) {
			if(err) {
				console.log('err retrieving all users: ', err);
				res.send(err);
			} else {
				res.status(200).json(data);
			}
		});
	}

}
