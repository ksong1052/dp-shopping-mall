const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ksong1052:abcd!234@db-shopping-mall.barnz.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology:true, 
    // useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! I am Daniel.')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})