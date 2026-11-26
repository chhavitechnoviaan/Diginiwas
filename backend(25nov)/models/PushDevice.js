import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  userRole: { type: String, required: true, enum: ['buyer','seller','partner','admin'] },
  token: { type: String, required: true, unique: true },
  platform: { type: String, required: true, enum: ['android','ios','web'] },
  enabled: { type: Boolean, default: true },
  lastSeenAt: { type: Date, default: Date.now }
}, { timestamps: true });
schema.index({ userId: 1, userRole: 1, enabled: 1 });
export default mongoose.models.PushDevice || mongoose.model('PushDevice', schema);
