var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	lookedAt: {type: String, required: true}
	
	});
	
module.exports = mongoose.model('emails', schema);
