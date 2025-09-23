const mongoose = require('mongoose')

// mongoose.connect("mongodb://127.0.0.1:27017/revital").then(() => {
mongoose.connect("mongodb+srv://sachin03:sachin03@cluster0.n3gnzav.mongodb.net/revital?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected To Database Successfully");
}).catch((err) => {
    console.log("Failed to connect with Database " , (err) );
})
