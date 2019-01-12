const Product = require('../models/product.model');
const getToken = require('../routes/verify');
const jwt = require('jsonwebtoken');

// CREATE-----------------------------------------------------------------------
exports.product_create = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let product = new Product({
                price: req.body.price,
                name: req.body.name,
                type: req.body.type
            });
            product.save(function(err,data) {
                if (err) {
                    return next(err);
                }
                res.send(data);
            })
        }
    });
};

// READ-------------------------------------------------------------------------
exports.product_details = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Product.findById(req.params.id, function(err, product) {
                if (err) return next(err);
                res.send(product);
            })
        }
    });
};

// UPDATE-----------------------------------------------------------------------
exports.product_update = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Product.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, function(err, product) {
                if (err) return next(err);
                res.send('Product Updated.');
            });
        }
    });
};

// DELETE-----------------------------------------------------------------------
exports.product_delete = function(req, res) {
    const bearerToken = getToken(req, res);
    jwt.verify(bearerToken, 'secretkey', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Product.findByIdAndRemove(req.params.id, function(err) {
                if (err) return next(err);
                res.send('Product Deleted');
            })
        }
    });
};
