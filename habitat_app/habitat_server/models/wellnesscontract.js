var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractSchema = new mongoose.Schema({
  tasks: {type: [Schema.Types.ObjectId], ref: 'Task', required: true},
  pending: {type: Boolean, required: true}
});

module.exports = mongoose.model('WContract', contractSchema);
