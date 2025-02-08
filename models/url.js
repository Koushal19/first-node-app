const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    ShortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true
    },
   visitHistory:[{timestamps :{type:Number}}],

},{timestamps: true});

module.exports = mongoose.model('url', urlSchema);  
