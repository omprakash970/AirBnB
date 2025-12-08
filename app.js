const express = require('express'); 
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Listing = require('./Models/listing')


const MONGO_URL = 'mongodb://localhost:27017/wanderlust';
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
app.get('/', (req, res) => {
  res.send('Hello I am root');
});
app.get('testListing',async (req, res)=>{
  let sampleListing = new Listing({
    title:"My New Villa", 
    description:"A beautiful villa with sea view",
    price:500000,
    location:"Goa", 
    Country:"India"
  })
  await sampleListing.save();
  console.log("Sample listing saved:", sampleListing);
  res.send("Sample listing created");

})
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});