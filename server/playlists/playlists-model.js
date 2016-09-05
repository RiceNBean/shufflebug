var mongoose = require('mongoose');

//playlist schema model
var PlaylistSchema = new mongoose.Schema({
	//all fields are given a name and a type
	//syntax for adding a field with a default, required && unique value
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	creator: { type: String, required: true },
	limit: { type: Number, default: 25 },
	//expiration, document will expire after a week
	createdAt: { type: Date, expires: '7d', default: Date.now },
	expiringIn: String,
	score: Number,
	fire: Boolean,
	tags: [],
	songs: [{
		title: String,
		songURL: String,
		duration: String,
		upvotes: { type: Number, default: 0 },
		downvotes: { type: Number, default: 0 },
	}]
//default name of collection as second argument
}, { collection: 'PlaylistCollection' });

//we now have a formSchema, BUT FIRST, inorder to create a new form
//first we need to create a data model from the schema
module.exports = mongoose.model('Playlist', PlaylistSchema);
