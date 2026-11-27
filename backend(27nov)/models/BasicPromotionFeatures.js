import mongoose from "mongoose";
const schema=new mongoose.Schema({code:{type:String,required:true,unique:true},features:{type:[String],default:[]}},{timestamps:true});
export default mongoose.models.BasicPromotionFeatures || mongoose.model("BasicPromotionFeatures",schema);
