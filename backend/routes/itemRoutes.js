const express = require('express');
const { createItem } = require('../controllers/createItem');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const router = express.Router();

console.log('itemRoutes loaded');
router.post('/', (req, res, next) => {
  console.log('POST /api/items hit');
  next();
}, authMiddleware, upload.single('image'), createItem);


module.exports = router;
