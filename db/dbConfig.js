const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://mongo:27017/docker-node-mongo',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));
