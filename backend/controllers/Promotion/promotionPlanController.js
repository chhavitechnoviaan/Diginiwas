import mongoose from "mongoose";
import PromotionPlan from "../../models/PromotionPlan.js";
import {getOrCreateCreditSettings} from "../../services/creditPricingService.js";
const core = new Set(["PARTNER_BOOST","PARTNER_FEATURED","PARTNER_LOCALITY_TOP","PROPERTY_BOOST","FEATURED_7_DAYS","LOCALITY_TOP_30_DAYS"]);
const placementOf=code => code.includes("LOCALITY_TOP")?"LOCALITY_TOP":code.includes("FEATURED")?"FEATURED":"BOOST";
export async function getPlans(req,res){try{
 const target=String(req.query.targetType||"").toUpperCase();
 if(target && !["PROPERTY","PARTNER"].includes(target)) return res.status(400).json({success:false,message:"Invalid targetType"});
 const settings=await getOrCreateCreditSettings();
 const basics=settings.products.filter(x=>core.has(x.code)).map(x=>({code:x.code,name:x.label,credits:x.credits,durationDays:x.durationDays,targetType:String(x.targetType).toUpperCase(),placement:placementOf(x.code),features:[],isActive:x.isActive!==false,isBasic:true}));
 const custom=await PromotionPlan.find({}).sort({createdAt:1}).lean();
 const all=[...basics,...custom.map(x=>({...x,isBasic:false}))].filter(x=>(!target||x.targetType===target)&& (req.query.includeInactive==="true" ? String(req.user?.role||"").toLowerCase()==="admin" : x.isActive));
 return res.json({success:true,data:{plans:all}});
}catch(e){return res.status(500).json({success:false,message:e.message})}}
export async function createPlan(req,res){try{
 const {name,targetType,credits,durationDays,placement,features=[],description=""}=req.body;
 if(!name||!["PROPERTY","PARTNER"].includes(targetType)||!["BOOST","FEATURED","LOCALITY_TOP"].includes(placement)||!Number.isFinite(Number(credits))||Number(credits)<0||!Number.isInteger(Number(durationDays))||Number(durationDays)<1||!Array.isArray(features)) return res.status(400).json({success:false,message:"Invalid plan parameters"});
 const code=`CUSTOM_${new mongoose.Types.ObjectId().toString().toUpperCase()}`;
 const item=await PromotionPlan.create({code,name:String(name).slice(0,90),description:String(description).slice(0,400),targetType,credits:Number(credits),durationDays:Number(durationDays),placement,features:features.slice(0,30).map(x=>String(x).slice(0,100)),createdBy:req.user?.id});
 return res.status(201).json({success:true,data:item});
}catch(e){return res.status(500).json({success:false,message:e.message})}}
export async function editPlan(req,res){try{
 const changes={}; for(const k of ["name","description","credits","durationDays","features","isActive"])if(Object.hasOwn(req.body,k))changes[k]=req.body[k];
 if(changes.credits!==undefined && (!Number.isFinite(Number(changes.credits))||Number(changes.credits)<0))return res.status(400).json({success:false,message:"Invalid credits"});
 if(changes.durationDays!==undefined && (!Number.isInteger(Number(changes.durationDays))||Number(changes.durationDays)<1))return res.status(400).json({success:false,message:"Invalid duration"});
 if(changes.placement && !["BOOST","FEATURED","LOCALITY_TOP"].includes(changes.placement))return res.status(400).json({success:false,message:"Invalid placement"});
 if(changes.features && (!Array.isArray(changes.features)||changes.features.length>30))return res.status(400).json({success:false,message:"Invalid features"});
 const item=await PromotionPlan.findByIdAndUpdate(req.params.id,{$set:changes},{new:true,runValidators:true});
 if(!item)return res.status(404).json({success:false,message:"Plan not found"});return res.json({success:true,data:item});
}catch(e){return res.status(400).json({success:false,message:e.message})}}
