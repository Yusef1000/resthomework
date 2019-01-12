// IMPORT-----------------------------------------------------------------------
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// DB SCHEMA--------------------------------------------------------------------
let ProductSchema = new Schema({
  price: {type: Number, require: true},
  name: {type: String, required: true},
  type: {type: String, required: true}
});

// EXPORT-----------------------------------------------------------------------
module.exports = mongoose.model('Product', ProductSchema);
