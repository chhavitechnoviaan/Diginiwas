import mongoose from "mongoose";
import {PROPERTY_PROMOTION_FEATURES,DEFAULT_PROPERTY_PROMOTION_PLANS} from "../../config/propertyPromotionCatalog.js";
import PromotionPlan from "../../models/PromotionPlan.js";
import PromotionFeature from "../../models/PromotionFeature.js";
import BasicPromotionFeatures from "../../models/BasicPromotionFeatures.js";
import {getOrCreateCreditSettings} from "../../services/creditPricingService.js";
const validLabels = v => Array.isArray(v) && v.length <= 30 && v.every(x => typeof x === "string" && x.trim().length > 0 && x.length <= 160);
const core = new Set(["PARTNER_BOOST","PARTNER_FEATURED","PARTNER_LOCALITY_TOP","PROPERTY_BOOST","FEATURED_7_DAYS","LOCALITY_TOP_30_DAYS"]);
const placementOf=code => code.includes("LOCALITY_TOP")?"LOCALITY_TOP":code.includes("FEATURED")?"FEATURED":"BOOST";
export async function ensurePromotionCatalog(){
 for(const f of PROPERTY_PROMOTION_FEATURES) await PromotionFeature.updateOne({key:f.key},{$set:{name:f.name,targetType:"PROPERTY",isActive:true,sortOrder:f.sortOrder}},{upsert:true});
 for(const p of DEFAULT_PROPERTY_PROMOTION_PLANS) await PromotionPlan.updateOne({code:p.code},{$setOnInsert:p},{upsert:true});
}
const validKeys=async (keys,targetType)=>{
 const clean=[...new Set(keys.map(x=>String(x).trim().toUpperCase()))];
 const allowed=new Set(PROPERTY_PROMOTION_FEATURES.map(x=>x.key));
 if(targetType==="PROPERTY" && clean.some(x=>!allowed.has(x))) return null;
 const records=await PromotionFeature.find({key:{$in:clean},isActive:true}).lean();
 return records.length===clean.length && records.every(x=>x.targetType==="BOTH"||x.targetType===targetType)?clean:null;
};
export async function getPlans(req,res){try{
 const target=String(req.query.targetType||"").toUpperCase();
 if(target && !["PROPERTY","PARTNER"].includes(target)) return res.status(400).json({success:false,message:"Invalid targetType"});
 await ensurePromotionCatalog();
 const settings=await getOrCreateCreditSettings();
 const baseAssignments=await BasicPromotionFeatures.find({}).lean();
 const assigned=new Map(baseAssignments.map(x=>[x.code,x.features]));
 const basics=settings.products.filter(x=>core.has(x.code)).map(x=>({code:x.code,name:x.label,credits:x.credits,durationDays:x.durationDays,targetType:String(x.targetType).toUpperCase(),placement:placementOf(x.code),features:assigned.get(x.code)||[],isActive:x.isActive!==false,isBasic:true}));
 const custom=await PromotionPlan.find({isDeleted:{$ne:true}}).sort({createdAt:1}).lean();
 const all=[...basics.filter(x=>x.code==="PARTNER_BOOST"),...custom.filter(x=>x.targetType==="PROPERTY").map(x=>({...x,isBasic:false}))].filter(x=>(!target||x.targetType===target)&& (res.locals?.includeInactivePromotionPlans === true || x.isActive));
 res.set("Cache-Control","no-store");
 return res.json({success:true,data:{plans:all}});
}catch(e){return res.status(500).json({success:false,message:e.message})}}
export async function createPlan(req,res){try{
 const {name,targetType,credits,durationDays,placement,features=[],displayFeatures=[],description=""}=req.body;
 if(!name||!["PROPERTY","PARTNER"].includes(targetType)||!["BOOST","FEATURED","LOCALITY_TOP","FEATURE_BASED"].includes(placement)||!Number.isFinite(Number(credits))||Number(credits)<0||!Number.isInteger(Number(durationDays))||Number(durationDays)<1||!Array.isArray(features)) return res.status(400).json({success:false,message:"Invalid plan parameters"});
 const code=`CUSTOM_${new mongoose.Types.ObjectId().toString().toUpperCase()}`;
 if(!validLabels(displayFeatures)) return res.status(400).json({success:false,message:"Invalid display features"});
 const keys=[...new Set(features.map(x=>String(x).trim().toUpperCase()))];
 if(keys.length>30)return res.status(400).json({success:false,message:"Too many features"});
 const available=await validKeys(keys,targetType);
 if(!available)return res.status(400).json({success:false,message:"Select valid Admin-created features for this target"});
 const item=await PromotionPlan.create({code,name:String(name).slice(0,90),description:String(description).slice(0,400),targetType,credits:Number(credits),durationDays:Number(durationDays),placement:targetType==="PROPERTY"?"FEATURE_BASED":placement,features:keys,displayFeatures:displayFeatures.map(x=>x.trim()),isActive:true,createdBy:req.user?._id||req.user?.id});
 return res.status(201).json({success:true,data:item});
}catch(e){return res.status(500).json({success:false,message:e.message})}}
export async function editPlan(req,res){try{
 const changes={}; for(const k of ["name","description","credits","durationDays","features","displayFeatures","isActive"])if(Object.hasOwn(req.body,k))changes[k]=req.body[k];
 if(changes.displayFeatures!==undefined && !validLabels(changes.displayFeatures))return res.status(400).json({success:false,message:"Invalid display features"});
 if(changes.displayFeatures)changes.displayFeatures=changes.displayFeatures.map(x=>x.trim());
 if(changes.credits!==undefined && (!Number.isFinite(Number(changes.credits))||Number(changes.credits)<0))return res.status(400).json({success:false,message:"Invalid credits"});
 if(changes.durationDays!==undefined && (!Number.isInteger(Number(changes.durationDays))||Number(changes.durationDays)<1))return res.status(400).json({success:false,message:"Invalid duration"});
 if(changes.placement && !["BOOST","FEATURED","LOCALITY_TOP"].includes(changes.placement))return res.status(400).json({success:false,message:"Invalid placement"});
 if(changes.features){if(!Array.isArray(changes.features)||changes.features.length>30)return res.status(400).json({success:false,message:"Invalid features"});const item=await PromotionPlan.findById(req.params.id);if(!item)return res.status(404).json({success:false,message:"Plan not found"});const valid=await validKeys(changes.features,item.targetType);if(!valid)return res.status(400).json({success:false,message:"Invalid feature keys"});changes.features=valid;}
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
export async function listFeatures(req,res){
 try{await ensurePromotionCatalog();return res.json({success:true,data:{features:await PromotionFeature.find({key:{$in:PROPERTY_PROMOTION_FEATURES.map(x=>x.key)}}).sort({sortOrder:1}).lean()}})}catch(e){return res.status(500).json({success:false,message:e.message})}
}
export async function createFeature(req,res){return res.status(403).json({success:false,message:"Feature library is fixed. Creating new features is disabled."})}
export async function deletePlan(req,res){try{const item=await PromotionPlan.findByIdAndUpdate(req.params.id,{$set:{isActive:false,isDeleted:true}},{new:true});if(!item)return res.status(404).json({success:false,message:"Plan not found"});return res.json({success:true,data:item})}catch(e){return res.status(400).json({success:false,message:e.message})}}
export async function setPlanFeatures(req,res){try{
 const code=String(req.params.code||"").toUpperCase();
 const features=req.body?.features;
 if(!Array.isArray(features)||features.length>50||features.some(x=>typeof x!=="string"))return res.status(400).json({success:false,message:"features must be an array of feature keys (max 50)"});
 const unique=[...new Set(features)];
 const valid=await PromotionFeature.find({key:{$in:unique},isActive:true}).lean();
 if(valid.length!==unique.length || unique.some(x=>!PROPERTY_PROMOTION_FEATURES.some(f=>f.key===x)))return res.status(400).json({success:false,message:"Unknown or inactive feature"});
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
