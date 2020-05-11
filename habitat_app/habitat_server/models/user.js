var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  friends: {type: [Schema.Types.ObjectId], ref: 'User', required: true},
  contracts: {type: [Schema.Types.ObjectId], ref: 'WContract', required: true},
  tasks: {type: [Schema.Types.ObjectId], ref: 'Task', required: true},
  pets: {type: [Schema.Types.ObjectId], ref: 'Pet', required: true},
  cosmetics: {type: [Schema.Types.ObjectId], ref: 'Cosmetic', required: true}
});

module.exports = mongoose.model('User', userSchema);
