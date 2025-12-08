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
    image: {
        type: String, 
        required: true,
        set: function(v) {
            return v === "" ? "default link" : v;
        }
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
