const mongoose= require('mongoose');
const data = require('./data');
const Listing=require('../Models/listing'); 
const MONGO_URL = 'mongodb://localhost:27017/wanderlust';
main()
.then(()=>{
    console.log("Connected to MongoDb"); 
})