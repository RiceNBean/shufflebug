var mongoose = require('mongoose');

//mongoose mimics a schema and validates data, fields and data types.
//MongoDB stores objects as plain JSON and mongoose works with the JSON
//adds the extra layer of validation

//makes mongoose connection to mongoDB programmatically, ie from our program
mongoose.connect(process.env.MONGODB_URI);

//user schema model (no password encryption yet)
var UserSchema = new mongoose.Schema({
	//all fields are given a name and a type
	//syntax for adding a field with a required && unique value
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
//default name of collection as second argument
}, { collection: 'UserCollection' });

//we now have a formSchema, BUT FIRST, inorder to create a new form
//first we need to create a data model from the schema
module.exports = mongoose.model('User', UserSchema);
