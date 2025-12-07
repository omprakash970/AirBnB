const express = require('express'); 
const app = express();
const port = 3000;
const mongoose = require('mongoose');
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

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});