const Item = require('../models/Item'); // Adjust path if needed
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.createItem = async (req, res) => {
  console.log('req.file', req.file);
  try {
    let imageUrl = '';

    // Upload image to Cloudinary if file is provided
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }

    // Create new item
    const newItem = new Item({
      user: req.user.id,
      imageUrl,
      brand: req.body.brand,
      category: req.body.category,
      tags: req.body.tags,
      status: req.body.status,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};