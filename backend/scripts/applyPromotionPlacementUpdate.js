import mongoose from "mongoose";
import dotenv from "dotenv";
import PromotionPlan from "../models/PromotionPlan.js";
import {DEFAULT_PROPERTY_PROMOTION_PLANS} from "../config/propertyPromotionCatalog.js";
dotenv.config();
const uri=process.env.MONGO_URI||process.env.MONGODB_URI;
if(!uri)throw new Error("Mongo URI required");
await mongoose.connect(uri);
try{for(const p of DEFAULT_PROPERTY_PROMOTION_PLANS.filter(p=>["AI_PROMOTION","PREMIUM_PROPERTY"].includes(p.code))){const old=await PromotionPlan.findOne({code:p.code,isDeleted:{$ne:true}}).lean();if(!old)continue;const features=p.code==="AI_PROMOTION"?[...new Set([...old.features.filter(x=>!["RECOMMENDED_FOR_YOU","POPULAR_NEAR_YOUR_LOCATION"].includes(x)),...p.features])]:[...new Set([...old.features,...p.features])];console.log(p.code,old.features,"=>",features);if(process.argv.includes("--apply"))await PromotionPlan.updateOne({_id:old._id},{$set:{features}});}}finally{await mongoose.disconnect();}
