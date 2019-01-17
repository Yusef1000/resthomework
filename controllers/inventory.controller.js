const Inventory = require('../models/inventory.model');
const getToken = require('../routes/verify');
const jwt = require('jsonwebtoken');

// CREATE-----------------------------------------------------------------------
exports.inventory_create = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let inventory = new Inventory({
                productID: req.body.productID,
                count: req.body.count
            });
            inventory.save(function(err,data) {
                if (err) {
                    return next(err);
                }
                res.send(data);
            });
        };
    });
};


// READ-------------------------------------------------------------------------
exports.inventory_details = function(req, res,next) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            Inventory.findById(req.params.id, function(err, inventory) {
              if (err){
                res.send('Object does not exist');
                return next(err);
              }

              else if(!inventory){
                  res.send('Object does not exist');
              }
              else{
                res.send(inventory);
              }
            });
        };
    });
};

// UPDATE-----------------------------------------------------------------------
exports.inventory_update = function(req, res,next) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Inventory.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, function(err, inventory) {
                if (err){
                  res.send('Object does not exist');
                  return next(err);
                }
                else if(!inventory){
                  res.send('Object does not exist');
                }
                else{
                res.send('Inventory Updated.');
              }
            });
        };
    });
};

// DELETE-----------------------------------------------------------------------
exports.inventory_delete = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Inventory.findByIdAndRemove(req.params.id, function(err,data) {

              if (err){
                res.send('Object does not exist');
                return next(err);
              }
              else if (!data) {
                res.send('Object does not exist');
              }
              else{
                res.send('Inventory Deleted');
              }
            });
        };
    });
};
// GET ALL----------------------------------------------------------------------
exports.inventory_getAll = function(req, res) {
            Inventory.find(function(err, inventory) {
              if (!err){
                res.send(inventory);
              }
              else{
                res.send('Object does not exist');
                return next(err);
              }
            });
};
