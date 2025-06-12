const Item = require('../models/Item');
const cloudinary = require('../config/cloudinary');
const fs         = require('fs');

exports.createItem = async (req, res) => {
    try {
      // 1. Multer puts the uploaded file info on req.file
      if (!req.file) {
        return res.status(400).json({ msg: 'No image file uploaded' });
      }
  
      // 2. Upload that file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'closetcloud',    // optional: organize in a folder
        use_filename: true,
      });
  
      // 3. Remove the temp file from your server
      fs.unlinkSync(req.file.path);
  
      // 4. Create the item with the secure URL from Cloudinary
      const { brand, category, tags, status } = req.body;
      const newItem = new Item({
        user: req.user.id,
        imageUrl: result.secure_url,   // <— cloudinary URL
        brand,
        category,
        tags: tags ? tags.split(',') : [], // assuming tags come as comma-string
        status,
      });
  
      const item = await newItem.save();
      res.status(201).json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
};


exports.getItems = async (req, res) => {
    try{
        const items = await Item.find({ user: req.user.id});
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error'})
    }
};

exports.getItemsbyUser = async (req, res) => {
    try{
        const items = await Item.find({ user: req.params.userId});
        return res.json(items);   
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error'});
    }
};

exports.getItems = async (req, res) => {
    try{
        const filter = { user: req.user.id};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.tags) filter.tags = { $in: req.query.tags.split(',')};
        const items = new Items.find(filter);
        res.json(items);    
    } catch (err){
        console.error(err);
        res.status(500).json({ message: 'Server Error'});
    }
};