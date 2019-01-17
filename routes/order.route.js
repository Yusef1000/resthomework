const express = require('express');
const router = express.Router();

// Require controllers
const order_controller = require('../controllers/order.controller');

router.get('/getAll', order_controller.order_getAll);
router.post('/create', order_controller.order_create);
router.get('/:id', order_controller.order_details);
router.put('/:id/update', order_controller.order_update);
router.delete('/:id/delete', order_controller.order_delete);


module.exports = router;
