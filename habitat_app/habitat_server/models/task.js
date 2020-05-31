var mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  due_date: {type: Date, required: true},
  daily: {type: Boolean, required: true},
  frequency: {type: [Boolean], required: true},
  start_date: {type: Date, required: true},
  datesCompleted: {type: [Date], required: true},
  streak: {type: Number, required: true}
});

module.exports = mongoose.model('Task', taskSchema);
