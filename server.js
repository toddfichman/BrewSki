const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');
// const config = require('config')
require('dotenv').config()

const router = express.Router();


const app = express();


//Bodyparser middleware
// app.use(bodyParser.json());

//express now has a built in bodyParser -> no longer need to install seperatly
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allows-Origins", "*"); //* allows acces to any client
  res.header(
    "Access-Control-Allows-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" //defines what headers are allowed to be sent w/ req
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'hello world'
  })
})
//Use routes
//any request sent to /api/items, should use the items above (file to items route)
// app.use('/api/items', require('./routes/api/items'));
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set a static folder 
    app.use(express.static('build'));

    //
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}

//Connect to mongo
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-22ex0.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB successfully connected")
  })
  .catch(err => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));