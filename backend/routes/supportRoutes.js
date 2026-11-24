import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import SupportQuery from '../models/SupportQuery.js';
const router=express.Router();
router.post('/',protect,async(req,res)=>{try{const {subject,message}=req.body||{};if(typeof subject!=='string'||typeof message!=='string'||!subject.trim()||!message.trim()||subject.length>150||message.length>2000)return res.status(400).json({success:false,message:'Subject and message are required (max 150/2000 characters).'});const query=await SupportQuery.create({userId:req.user.id,userRole:req.user.role,subject,message});return res.status(201).json({success:true,data:{id:query._id}});}catch(e){return res.status(500).json({success:false,message:'Unable to submit support query'});}});
export default router;
