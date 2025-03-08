// backend/src/routes/itemRoutes.js
const express = require('express');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/item.controllers');
const validateItem = require('../middlewares/validateItem');
const router = express.Router();

router.post('/',validateItem, createItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
