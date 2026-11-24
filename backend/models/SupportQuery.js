import mongoose from 'mongoose';
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,required:true},userRole:{type:String,required:true},subject:{type:String,required:true,trim:true,maxlength:150},message:{type:String,required:true,trim:true,maxlength:2000}},{timestamps:true});
export default mongoose.model('SupportQuery',schema);
