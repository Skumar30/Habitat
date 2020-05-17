var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new mongoose.Schema({
  cosmetics: {type: [Schema.Types.ObjectId], ref: 'Cosmetic', required: true},
  health: {type: Number, required: true},
  happiness: {type: Number, required: true},
  type: {type: String, required: true}
});

module.exports = mongoose.model('Pet', petSchema);
