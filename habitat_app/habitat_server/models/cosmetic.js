var mongoose = require('mongoose');

var cosmeticSchema = new mongoose.Schema({
  type: {type: String, required: true}
});

module.exports = mongoose.model('Cosmetic', cosmeticSchema);
