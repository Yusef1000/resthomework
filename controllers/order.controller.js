const Order = require('../models/order.model');
const Inventory = require('../models/inventory.model');
const getToken = require('../routes/verify');
const jwt = require('jsonwebtoken');

// CREATE-----------------------------------------------------------------------
exports.order_create = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let order = new Order({
                productID: req.body.productID,
                count: req.body.count,
                address: req.body.address
            });

            order.save(function(err, data) {
                if (err) {
                    return next(err);
                };
                res.send(data);
            });
            // DECREMENT COUNT IN INVENTORY
            Inventory.findOneAndUpdate({
                    productID: req.body.productID
                }, {
                    $inc: {
                        count: -req.body.count
                    }
                },
                function(err, inventory) {
                    if (err) return next(err);
                });
        };
    });
};

// READ-------------------------------------------------------------------------
exports.order_details = function(req, res, next) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Order.findById(req.params.id, function(err, order) {
                if (err){
                  res.send('Object does not exist');
                  return next(err);
                }
                else if(!order){
                    res.send('Object does not exist');
                }
                else{
                  res.send(order);
                }
            });
        };
    });
};

// UPDATE-----------------------------------------------------------------------
exports.order_update = function(req, res, next) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, function(err, order) {
                if (err){
                  res.send('Object does not exist');
                  return next(err);
                }
                else if(!order){
                  res.send('Object does not exist');
                }
                else{
                res.send('Order Updated.');
              }
            });
        };
    });
};

// DELETE-----------------------------------------------------------------------
exports.order_delete = function(req, res,next) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Order.findById(req.params.id, function(err, order) {
                if (err){
                  res.send('Object does not exist');
                  return next(err);
                }
                if(!order){
                  res.send('Object does not exist');
                }
                // INCREMENT COUNT IN INVENTORY
                Inventory.findOneAndUpdate({
                        productID: order.productID
                    }, {
                        $inc: {
                            count: order.count
                        }
                    },
                    function(err, inventory) {
                        if (err) return next(err);
                    });
            });

            Order.findByIdAndRemove(req.params.id, function(err) {
                if (err) return next(err);
                res.send('Order Deleted');
            });
        }
    });
};
// GET ALL----------------------------------------------------------------------
exports.order_getAll = function(req, res) {
            Order.find(function(err, order) {
              if (!err){
                res.send(order);
              }
              else{
                res.send('Object does not exist');
                return next(err);
              }
            });
};
