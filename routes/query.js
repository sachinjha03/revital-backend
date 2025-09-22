const express = require('express')
const Query = require('../models/Query')
const router = express.Router()



// ADD NEW QUERY
router.post("/query" , async(req,res) => {
    try{
        const newQuery = new Query(req.body);
        const response = await newQuery.save();
        res.status(200).json({success:true , data:response})
    }catch(err){
        res.status(500).json({success:false , reason:err})
    }
})


// READ ALL QUERY
router.get("/query" , async(req,res) => {
    try{
        const response = await Query.find();
        res.status(200).json({success:true , data:response})
    }catch(err){
        res.status(500).json({success:false , reason:err})
    }
})


//UPDATE ONE QUERY
router.put("/query/:id" , async(req,res) => {
    try{
        const _id = req.params.id;
        const isQueryExist = await Query.findById(_id);
        if(isQueryExist){
            const response = await Query.findByIdAndUpdate(_id , {$set:req.body} , {new:true})
            res.status(200).json({success:true , data:response})
        }else{
            res.status(404).json({success:false , reason:"Query Not Found"})
        }
    }catch(err){
        res.status(500).json({success:false , reason:err})
    }
})


//DELETE ONE QUERY
router.delete("/query/:id" , async(req,res) => {
    try{
        const _id = req.params.id;
        const isQueryExist = await Query.findOne({_id})
        if(isQueryExist){
            const response = await Query.findByIdAndDelete(_id)
            res.status(200).json({success:true , data:response})
        }else{
            res.status(404).json({success:false , reason:"Query Not Found"})
        }
    }catch(err){
        res.status(500).json({succes:false , reason:err})
    }
})

module.exports = router;