const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    icon:String,
    name:String,
    description:String
})
const Service = new mongoose.model("Service" , ServiceSchema)

module.exports = Service;