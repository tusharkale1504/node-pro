const mongoose = require('mongoose');


//Define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';


//Set up MongoDB connection
mongoose.connect(mongoURL,{

   
})

//Get the default connection
//mongoose maintain a default   connection object representing the mongoDB connection.
const db = mongoose.connection;


//Define events listeners for database connections.
    db.on('connected',()=>{
        console.log("Connected to MongoDB Server");
    })

    db.on('error',(err)=>{
        console.error("MongoDB connection error",err);
    })

    db.on('disconnected',()=>{
        console.log("Disconnected MongoDB");
    })

   // Export the database connection

   module.exports = db;