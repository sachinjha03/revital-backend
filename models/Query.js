const mongoose = require('mongoose')

const QuerySchema = new mongoose.Schema({
    name:String,
    email:String,
    contact:Number,
    queryType:String,
    query:String,
    status:{
        type : String,
        default:"Unresolved"
    }
})

const Query = new mongoose.model("Query" , QuerySchema)

module.exports = Query;