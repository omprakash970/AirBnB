const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: String, 
    description: String,
    imagine: String, 
    price: Number,
    location: String, 
    Country: String
});
const Listing= mongoose.model('Listing', listingSchema); 
