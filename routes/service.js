const express = require('express');
const Service = require('../models/Service');
const router = express.Router();


// CREATE SERVCE
router.post("/service" , async(req,res) => {
    try{ 
        const newService = new Service(req.body);
        const response = await newService.save();
        res.status(200).json({success:true , data:response})
    }catch(Err){
        res.status(500).json({success:false , reason:Err})
    }
})

//READ ALL SERVICE
router.get("/service" , async(req,res) => {
    try{
        const response = await Service.find();
        res.status(200).json({success:true , data:response})
    }catch(err){
        res.status(500).json({success:false , reason:err})
    }
})

//READ ONE SERVICE
router.get("/service/:id" , async(req,res) => {
    try{
        const _id = req.params.id;
        const response = await Service.findById(_id)
        if(response){
            res.status(200).json({success:true , data:response})
        }else{
            res.status(404).json({success:false , reason:"Service Not Found"})
        }
    }catch(err){
        res.status(500).json({success:false , reason:err})
    }
})


//UPDATE SERVICE
router.put("/service/:id" , async(req,res) => {
    const _id = req.params.id
    const isServiceExist = await Service.findById(_id);
    if(isServiceExist){
        const resposne = await Service.findByIdAndUpdate(_id , {$set:req.body} , {new:true})
        res.status(200).json({success:true , data:"Service Updated Successfully"})
    }else{
        res.status(404).json({success:false , reason:"Service Not Found"})
    }
    
})


//DELETE SERVICE
router.delete("/service/:id" , async(req,res) => {
    try{
        const _id = req.params.id;
        const resposne = await Service.findByIdAndDelete(_id)
        if(resposne){
            res.status(200).json({success:true , data:"Service Deleted Successfully"})
        }else{
            res.status(404).json({success:false , reason:"Service Not Found"})
        }
    }catch(err){
        res.status(500).json({success:false , reason:err})
    }
})

module.exports =  router;