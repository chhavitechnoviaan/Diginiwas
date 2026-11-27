import mongoose from 'mongoose';
const schema = new mongoose.Schema({ key:{type:String,unique:true,required:true}, channel:String, payload:mongoose.Schema.Types.Mixed, status:{type:String,default:'Pending'}, attempts:{type:Number,default:0}, nextAt:{type:Date,default:Date.now}, lastError:String },{timestamps:true});
schema.index({status:1,nextAt:1});
export default mongoose.model('NotificationDelivery',schema);
