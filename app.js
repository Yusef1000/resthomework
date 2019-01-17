// IMPORTS----------------------------------------------------------------------
const fs = require('fs');
var marked = require('marked');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('./routes/product.route');
const inventory = require('./routes/inventory.route');
const order = require('./routes/order.route');
const jwt = require('jsonwebtoken');

// INITIALIZE EXPRESS-----------------------------------------------------------
const app = express();

// MIDDLEWARE-------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ROUTES-----------------------------------------------------------------------
app.use('/products', product);
app.use('/inventory', inventory);
app.use('/order', order);

// MONGOOSE CONNECTION----------------------------------------------------------
let dev_db_url = 'mongodb://someuser:abcd1234@ds255364.mlab.com:55364/hbc';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// JWT--------------------------------------------------------------------------
app.post('/api/login', (req, res) => {
  // HARDCODED USER SO WE CAN GENERATE TOKEN
  const user = {
    id:1,
    username: 'Yusef',
    email: 'yusef@hbc.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});

// PORT NUMBER------------------------------------------------------------------
let port = process.env.PORT || 1234;
app.get('/', function (req, res) {
  var path = __dirname + '/README.md';
  var file = fs.readFileSync(path, 'utf8');
  res.send(marked(file.toString()));
})
app.listen(port, '0.0.0.0',() => {
  console.log('Server up and running on port ' + port);
});
