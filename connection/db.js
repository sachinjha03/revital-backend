const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/revital").then(() => {
    console.log("Connected To Database Successfully");
}).catch((err) => {
    console.log("Failed to connect with Database " , (err) );
})
