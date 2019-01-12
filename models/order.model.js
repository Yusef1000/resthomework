// IMPORT-----------------------------------------------------------------------
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// DB SCHEMA--------------------------------------------------------------------
let OrderSchema = new Schema({
  productID: {type: String, require: true},
  count: {type: Number, required: true},
  address: {type: String, required: true}
});

//EXPORT------------------------------------------------------------------------
module.exports = mongoose.model('Order', OrderSchema);
