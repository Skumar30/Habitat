var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new mongoose.Schema({
  participants: {type: [Schema.Types.ObjectId], ref: 'User', required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  tasks: {type: [Schema.Types.ObjectId], ref: 'Task', required: true},
  pending: {type: Boolean, required: true},
  due_date: {type: Date, required: true}
});

module.exports = mongoose.model('Contract', contractSchema);
