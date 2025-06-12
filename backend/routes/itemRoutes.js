const express = require('express');
const { createItem, getItems } = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createItem,
    getItem,
    getItembyUser,
} = require('../controllers/itemController');
const router = express.Router();
const upload = multer({ dest: 'uploads/'});

router.post(
    '/',
    auth,
    upload.single('image'),
    createItem
);


router.post('/', authMiddleware, createItem);
router.get('/', authMiddleware, getItems);
router.get('/user/:userId', authMiddleware, getItemsbyUser);

module.exports = router;
