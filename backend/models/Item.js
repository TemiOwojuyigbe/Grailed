const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true},
    brand:    { type: String, required: true},
    category: { type: String, required: true},
    tags:     [String],
    status:   { type: String, enum: ['swap', 'sell', 'trade'], default: 'swap'},
    createdAt:{ type: Date, default: Date.now},

});

module.exports = mongoose.model('Item', itemSchema);