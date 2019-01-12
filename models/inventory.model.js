// IMPORT-----------------------------------------------------------------------
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// DB SCHEMA--------------------------------------------------------------------
let InventorySchema = new Schema({
  productID: {type: String, require: true},
  count: {type: Number, required: true}
});

//EXPORT-------------------------------------------------------------------------------
module.exports = mongoose.model('Inventory', InventorySchema);
