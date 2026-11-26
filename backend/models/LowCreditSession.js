import mongoose from 'mongoose';
const schema=new mongoose.Schema({partnerId:{type:mongoose.Schema.Types.ObjectId,required:true},sessionId:{type:String,required:true},count:{type:Number,default:0},lastShown:{type:Date,default:null},expiresAt:{type:Date,required:true}});
schema.index({partnerId:1,sessionId:1},{unique:true});schema.index({expiresAt:1},{expireAfterSeconds:0});
export default mongoose.models.LowCreditSession||mongoose.model('LowCreditSession',schema);
