const express = require('express');
const router = express.Router();

// Require controllers
const product_controller = require('../controllers/product.controller');

router.get('/getAll', product_controller.product_getAll);
router.post('/create', product_controller.product_create);
router.get('/:id', product_controller.product_details);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);


module.exports = router;
