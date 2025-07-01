const multer = require('multer');
// uses memory storage so we can upload directly to cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage});

module.exports = upload;