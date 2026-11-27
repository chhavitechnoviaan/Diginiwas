import PromotionRequest from "../../models/PromotionRequest.js";
import Property from "../../models/NewProperty.js";
import Partner from "../../models/Partner.js";

const active = async (req,res,targetType) => {
 try {
  const page=Math.max(1,Number(req.query.page)||1);
  const limit=Math.min(50,Math.max(1,Number(req.query.limit)||20));
  const now=new Date();
  const filter={targetType,status:"Approved",expiresAt:{$gt:now}};
  if(req.query.promotionType) filter.promotionType=req.query.promotionType;
  const records=await PromotionRequest.find(filter).sort({approvedAt:-1}).lean();
  const ids=[...new Set(records.map(r=>String(targetType==="PROPERTY"?r.propertyMongoId:r.partnerMongoId)).filter(Boolean))];
  const Model=targetType==="PROPERTY"?Property:Partner;
  const projection=targetType==="PROPERTY"?"title propertyId city locality status propertyVerificationStatus images promotions": "name partnerId location promotions profileImage";
  const docs=await Model.find({_id:{$in:ids}}).select(projection).lean();
  const documentMap=new Map(docs.map(d=>[String(d._id),d]));
  const out=[];
  for(const id of ids){
   const entity=documentMap.get(id);
   if(!entity)continue;
   if(targetType==="PROPERTY"&&(entity.status!=="Live"||entity.propertyVerificationStatus!=="Verified"))continue;
   const promotions=records.filter(r=>String(targetType==="PROPERTY"?r.propertyMongoId:r.partnerMongoId)===id);
   if(req.query.city && !promotions.some(p=>String(p.city||"").toLowerCase()===String(req.query.city).toLowerCase()))continue;
   if(req.query.locality && !promotions.some(p=>String(p.locality||"").toLowerCase()===String(req.query.locality).toLowerCase()))continue;
   out.push({entity,promotions:promotions.map(p=>({id:p._id,promotionType:p.promotionType,plan:p.planSnapshot||null,approvedAt:p.approvedAt,expiresAt:p.expiresAt}))});
  }
  return res.json({success:true,data:out.slice((page-1)*limit,page*limit),pagination:{page,limit,total:out.length}});
 }catch(e){return res.status(500).json({success:false,message:e.message})}
};
export const activeProperties=(req,res)=>active(req,res,"PROPERTY");
export const activePartners=(req,res)=>active(req,res,"PARTNER");
