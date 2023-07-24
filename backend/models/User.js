const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // we will not call the function, it will be called when user authentication is done 
    }
});

module.exports = mongoose.model('user', UserSchema);