var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  friends: {type: [Schema.Types.ObjectId], ref: 'User', required: true},
  contracts: {type: [Schema.Types.ObjectId], ref: 'Contract', required: true},
  tasks: {type: [Schema.Types.ObjectId], ref: 'Task', required: true},
  pets: {type: [String], required: true}, //stores different forms of pets
  cosmetics: {type: [Schema.Types.ObjectId], ref: 'Cosmetic', required: true},
  credits: {type: Number, required: true},
  pet_id: {type: Schema.Types.ObjectId, ref: 'Pet', required: true} //stores current active pet
});

module.exports = mongoose.model('User', userSchema);
