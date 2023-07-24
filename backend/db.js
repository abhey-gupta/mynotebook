const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/mynotebook'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectToMongo;