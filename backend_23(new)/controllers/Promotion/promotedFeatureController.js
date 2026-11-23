import PromotionRequest from "../../models/PromotionRequest.js";
import Property from "../../models/NewProperty.js";
import {PROPERTY_PROMOTION_FEATURES} from "../../config/propertyPromotionCatalog.js";
export async function getPromotedPropertiesByFeature(req,res){
 try{
 const feature=String(req.query.feature||"").trim().toUpperCase();
 if(!PROPERTY_PROMOTION_FEATURES.some(x=>x.key===feature))return res.status(400).json({success:false,message:"Invalid feature key"});
 const now=new Date();const limit=Math.min(100,Math.max(1,Number(req.query.limit)||20));
 const matches=await PromotionRequest.find({targetType:"PROPERTY",status:"Approved",expiresAt:{$gt:now},"planSnapshot.features":feature}).sort({approvedAt:-1}).limit(500).select("propertyMongoId").lean();
 const ids=[...new Set(matches.map(x=>String(x.propertyMongoId)).filter(Boolean))];
 const properties=await Property.find({_id:{$in:ids},status:"Live",propertyVerificationStatus:"Verified"}).limit(limit).lean();
 return res.json({success:true,data:properties,count:properties.length,feature});
 }catch(e){return res.status(500).json({success:false,message:e.message})}
}
