var mongoose = require('mongoose');

//makes mongoose connection to mongoDB programmatically, ie from our program
mongoose.connect(process.env.MONGODB_URI);

//mongoose mimics a schema and validates data, fields and data types.
//MongoDB stores objects as plain JSON and mongoose works with the JSON
//adds the extra layer of validation

//playlist schema model
var PlaylistSchema = new mongoose.Schema({
	//all fields are given a name and a type
	//syntax for adding a field with a default, required && unique value
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	limit: { type: Number, default: 25 },
	//experation, document will expire after a week
	createdAt: { type: Date, expires: '7d', default: Date.now },
	score: Number,
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
