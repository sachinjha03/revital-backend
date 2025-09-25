const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected To Database Successfully");
}).catch((err) => {
    console.log(process.env.MONGODB_URL)
    console.log("Failed to connect with Database " , (err) );
})
