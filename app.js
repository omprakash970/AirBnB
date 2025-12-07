const express = require('express'); 
const app = express();
const port = 3000;
const mongoose = require('mongoose');


app.get('/', (req, res) => {
  res.send('Hello I am root');
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});