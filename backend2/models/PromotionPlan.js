import mongoose from "mongoose";
const schema = new mongoose.Schema({
 code:{type:String,required:true,unique:true,uppercase:true,trim:true},
 name:{type:String,required:true,trim:true}, description:{type:String,default:""},
 targetType:{type:String,enum:["PROPERTY","PARTNER"],required:true},
 credits:{type:Number,min:0,required:true}, durationDays:{type:Number,min:1,required:true},
 placement:{type:String,enum:["BOOST","FEATURED","LOCALITY_TOP"],required:true},
 features:{type:[String],default:[]}, isActive:{type:Boolean,default:true},
 createdBy:{type:mongoose.Schema.Types.ObjectId,default:null}
},{timestamps:true});
export default mongoose.models.PromotionPlan || mongoose.model("PromotionPlan",schema);
