const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    },
    imagine: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    Country: {
        type: String,
        required: true
    }
});
const Listing= mongoose.model('Listing', listingSchema); 
module.exports = Listing;
