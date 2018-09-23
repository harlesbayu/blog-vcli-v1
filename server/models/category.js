const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const categorytSchema = new Schema({
    name: {
        type: String,
    }
},{
    timestamps : true
});

const Category = mongoose.model('Comment', categorytSchema);

module.exports = Category