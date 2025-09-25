const express = require('express')
const cors = require('cors')
require("dotenv").config();
require("./connection/db")
const PORT = process.env.PORT||7000
const app = express()

const allowedOrigins = [
  'http://localhost:5173', // Client-side frontend URL
  'http://localhost:5174', // Admin panel URL (adjust as needed)
  'https://revital-phsyio.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed.'));
    }
  }
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use("/api" , require("./routes/service"))
app.use("/api" , require("./routes/query"))
app.use("/api" , require("./routes/product"))
app.use("/api" , require("./routes/order"))

app.listen( PORT , () => {
    console.log("Listening to Backend at port" , PORT);
    
})