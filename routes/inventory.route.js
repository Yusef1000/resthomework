const express = require('express');
const router = express.Router();

// Require controllers
const inventory_controller = require('../controllers/inventory.controller');

router.post('/create', inventory_controller.inventory_create);
router.get('/:id', inventory_controller.inventory_details);
router.put('/:id/update', inventory_controller.inventory_update);
router.delete('/:id/delete', inventory_controller.inventory_delete);


module.exports = router;
