// const express = require('express'); 
// const app = express();
// const port = 3000;
// const mongoose = require('mongoose');
// const Listing = require('./Models/listing')
// const path = require('path');
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./Models/listing');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('layout', 'Layouts/boilerplate');


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
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index', { listings: allListings });
});
//show route: 
app.get('/listings/new', (req, res) => {
  res.render('listings/new.ejs');
});
app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send('Listing not found');
  }
  res.render('listings/show', { listing });
});

// Edit form
app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send('Listing not found');
  }
  res.render('listings/edit', { listing });
});

app.post('/listings', async (req, res) => {
  const { title, description, price, location, country } = req.body;
  const newListing = new Listing({
    title,
    description,
    image: "",
    price,
    location,
    Country: country
  });
  await newListing.save();
  res.redirect(`/listings/${newListing._id}`);
});

// Update listing
app.put('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country, image } = req.body;
  const update = {
    title,
    description,
    image: image || "",
    price,
    location,
    Country: country,
  };
  const listing = await Listing.findByIdAndUpdate(id, update, { runValidators: true, new: true });
  if (!listing) {
    return res.status(404).send('Listing not found');
  }
  res.redirect(`/listings/${listing._id}`);
});

// app.get('/testListing',async (req, res)=>{
//   let sampleListing = new Listing({
//     title:"My New Villa", 
//     description:"A beautiful villa with sea view",
//     image:"https://example.com/default.jpg",
//     price:500000,
//     location:"Goa", 
//     Country:"India"
//   })
//   await sampleListing.save();
//   console.log("Sample listing saved:", sampleListing);
//   res.send("Sample listing created");

// })
 
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});