import mongoose from "mongoose";
const schema = new mongoose.Schema({
 name:{type:String,required:true,trim:true,maxlength:100},
 key:{type:String,required:true,unique:true,uppercase:true,trim:true},
 targetType:{type:String,enum:["PROPERTY","PARTNER","BOTH"],default:"PROPERTY"},
 isActive:{type:Boolean,default:true},
 sortOrder:{type:Number,default:0},
 createdBy:{type:mongoose.Schema.Types.ObjectId,default:null}
},{timestamps:true});
export default mongoose.models.PromotionFeature || mongoose.model("PromotionFeature",schema);
