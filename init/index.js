const mongoose= require('mongoose');
const data = require('./data');
const Listing=require('../Models/listing'); 
const MONGO_URL = 'mongodb://localhost:27017/wanderlust';
main()
.then(()=>{
    console.log("Connected to MongoDb"); 
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}