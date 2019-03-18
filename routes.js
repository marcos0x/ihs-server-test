const express = require('express');
const api = require('./api');

const router = express.Router();

// // Product Detail

// router.get('/items/:id', (req, res) => {
//   api
//     .getItem(req.params.id)
//     .then(() => api.getItemDescription(req.params.id))
//     .then(() => api.processItemResponse(res))
//     .catch(error => res.status(400).send(error));
// });

// // Search Results

// router.get('/items', (req, res) => {
//   api
//     .getItems(req.query)
//     .then(() => api.processItemsResponse(res))
//     .catch(error => res.status(400).send(error));
// });

module.exports = router;
