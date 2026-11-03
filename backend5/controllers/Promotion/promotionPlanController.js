import mongoose from "mongoose";
import PromotionPlan from "../../models/PromotionPlan.js";
import PromotionFeature from "../../models/PromotionFeature.js";
import BasicPromotionFeatures from "../../models/BasicPromotionFeatures.js";
import {getOrCreateCreditSettings} from "../../services/creditPricingService.js";
const core = new Set(["PARTNER_BOOST","PARTNER_FEATURED","PARTNER_LOCALITY_TOP","PROPERTY_BOOST","FEATURED_7_DAYS","LOCALITY_TOP_30_DAYS"]);
const placementOf=code => code.includes("LOCALITY_TOP")?"LOCALITY_TOP":code.includes("FEATURED")?"FEATURED":"BOOST";
export async function getPlans(req,res){try{
 const target=String(req.query.targetType||"").toUpperCase();
 if(target && !["PROPERTY","PARTNER"].includes(target)) return res.status(400).json({success:false,message:"Invalid targetType"});
 const settings=await getOrCreateCreditSettings();
 const baseAssignments=await BasicPromotionFeatures.find({}).lean();
 const assigned=new Map(baseAssignments.map(x=>[x.code,x.features]));
 const basics=settings.products.filter(x=>core.has(x.code)).map(x=>({code:x.code,name:x.label,credits:x.credits,durationDays:x.durationDays,targetType:String(x.targetType).toUpperCase(),placement:placementOf(x.code),features:assigned.get(x.code)||[],isActive:x.isActive!==false,isBasic:true}));
 const custom=await PromotionPlan.find({}).sort({createdAt:1}).lean();
 const all=[...basics,...custom.map(x=>({...x,isBasic:false}))].filter(x=>(!target||x.targetType===target)&& (res.locals?.includeInactivePromotionPlans === true || x.isActive));
 return res.json({success:true,data:{plans:all}});
}catch(e){return res.status(500).json({success:false,message:e.message})}}
export async function createPlan(req,res){try{
 const {name,targetType,credits,durationDays,placement,features=[],description=""}=req.body;
 if(!name||!["PROPERTY","PARTNER"].includes(targetType)||!["BOOST","FEATURED","LOCALITY_TOP"].includes(placement)||!Number.isFinite(Number(credits))||Number(credits)<0||!Number.isInteger(Number(durationDays))||Number(durationDays)<1||!Array.isArray(features)) return res.status(400).json({success:false,message:"Invalid plan parameters"});
 const code=`CUSTOM_${new mongoose.Types.ObjectId().toString().toUpperCase()}`;
 const keys=[...new Set(features.map(x=>String(x).trim().toUpperCase()))];
 if(keys.length>30)return res.status(400).json({success:false,message:"Too many features"});
 const available=await PromotionFeature.find({key:{$in:keys},isActive:true}).lean();
 if(available.length!==keys.length||available.some(f=>f.targetType!=="BOTH"&&f.targetType!==targetType))return res.status(400).json({success:false,message:"Select valid Admin-created features for this target"});
 const item=await PromotionPlan.create({code,name:String(name).slice(0,90),description:String(description).slice(0,400),targetType,credits:Number(credits),durationDays:Number(durationDays),placement,features:keys,isActive:false,createdBy:req.user?._id||req.user?.id});
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

// Previously seeded system-only features are hidden from the Admin feature library.
// We never delete records: existing promotions and historical feature keys stay valid.
const legacyStarterKeys = new Set([
 "RECOMMENDED_FOR_YOU","POPULAR_NEAR_YOUR_LOCATION","NIWAS_AI_SUGGESTED_PROPERTIES",
 "PROPERTY_STORIES","7_DAYS_META_ADS","PROFESSIONAL_VIDEOGRAPHY",
 "APPOINTMENT_SITE_VISIT_HELP","PRIORITY_PLACEMENT","CUSTOM_META_SERVICES",
 "ADMIN_APPROVAL_REQUIRED","PARTNER_PROFILE_HIGHLIGHT",
 "FEATURED_PARTNER_PLACEMENT","LOCALITY_TOP_PARTNER_PLACEMENT"
]);
const featureKey=name=>String(name).trim().toUpperCase().replace(/[^A-Z0-9]+/g,"_").replace(/^_|_$/g,"").slice(0,80);
export async function listFeatures(req,res){try{
 const records=await PromotionFeature.find({isActive:true}).sort({sortOrder:1,createdAt:1}).lean();
 const features=records.filter(f=>!legacyStarterKeys.has(f.key)||f.createdBy);
 return res.json({success:true,data:{features}});
}catch(e){return res.status(500).json({success:false,message:"Could not load features"})}}
export async function createFeature(req,res){try{
 const name=String(req.body?.name||"").trim(); const targetType=req.body?.targetType||"PROPERTY";
 if(name.length<2||name.length>100||!["PROPERTY","PARTNER","BOTH"].includes(targetType))return res.status(400).json({success:false,message:"Invalid feature name or target"});
 const key=featureKey(name); if(!key)return res.status(400).json({success:false,message:"Invalid feature name"});
 const existing=await PromotionFeature.findOne({key}); if(existing)return res.status(409).json({success:false,message:"Feature already exists"});
 const feature=await PromotionFeature.create({name,key,targetType,createdBy:req.user?._id||req.user?.id});
 return res.status(201).json({success:true,data:feature});
}catch(e){return res.status(500).json({success:false,message:"Could not create feature"})}}
export async function setPlanFeatures(req,res){try{
 const code=String(req.params.code||"").toUpperCase();
 const features=req.body?.features;
 if(!Array.isArray(features)||features.length>50||features.some(x=>typeof x!=="string"))return res.status(400).json({success:false,message:"features must be an array of feature keys (max 50)"});
 const unique=[...new Set(features)];
 const valid=await PromotionFeature.find({key:{$in:unique},isActive:true}).lean();
 if(valid.length!==unique.length)return res.status(400).json({success:false,message:"Unknown or inactive feature"});
 const settings=await getOrCreateCreditSettings();
 const base=settings.products.find(x=>core.has(x.code)&&x.code===code);
 const custom=base?null:await PromotionPlan.findOne({code});
 if(!base&&!custom)return res.status(404).json({success:false,message:"Plan not found"});
 const target=String(base?.targetType||custom?.targetType).toUpperCase();
 if(valid.some(x=>x.targetType!=="BOTH"&&x.targetType!==target))return res.status(400).json({success:false,message:"Feature target does not match plan"});
 if(base)await BasicPromotionFeatures.findOneAndUpdate({code},{$set:{features:unique}},{upsert:true,new:true});
 else {custom.features=unique; await custom.save();}
 return res.json({success:true,data:{code,features:unique}});
}catch(e){return res.status(500).json({success:false,message:"Could not update plan features"})}}
