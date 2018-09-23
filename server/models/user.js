const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    picture: {
        type: String,
    },
    gender:  {
        type: String,
        required: [true, 'gender is required']
    },
    phone:  {
        type: String,
        required: [true, 'phone number is required']
    },
    address:  {
        type: String,
        required: [true, 'address is required']
    },
    email:  {
        type: String,
        unique : true,
        required: [true, 'email is required']
    },
    password:  {
        type: String,
        required: [true, 'password is required'],
    }
},{
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User