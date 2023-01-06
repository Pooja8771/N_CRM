const express = require('express')
const app = express();
const mongoose = require('mongoose')
const serverConfig = require('./configs/server.config')
const dbConfig = require('./configs/db.config');
const bodyParser = require('body-parser');
mongoose.set('strictQuery', false);
mongoose.connect(dbConfig.DB_URL); 
const db = mongoose.connection ;
db.on('error',()=>{
    console.log(" Error while connecting to database")
}) ;
db.once('open',() =>{
  console.log(" DB connection successful")
});

// middleware to convert json object to js objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


require('./routes/user.routes')(app);
app.listen(serverConfig.PORT,()=>{
    console.log(" Server Started at" , serverConfig.PORT)
})

