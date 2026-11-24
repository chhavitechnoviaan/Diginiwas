import PushDevice from '../models/PushDevice.js';
const identity = req => ({ userId: req.user.id, userRole: String(req.user.role || '').toLowerCase() });
const allowed = req => ['buyer','seller','partner','admin'].includes(identity(req).userRole);
export async function registerPushDevice(req, res) {
  if (!allowed(req)) return res.status(403).json({ success: false, message: 'Unsupported role' });
  const { token, platform } = req.body || {};
  if (typeof token !== 'string' || token.length < 20 || token.length > 4096 || !['android','ios','web'].includes(platform))
    return res.status(400).json({ success: false, message: 'Valid token and platform required' });
  try {
    await PushDevice.findOneAndUpdate({ token }, { $set: { ...identity(req), platform, enabled: true, lastSeenAt: new Date() } }, { upsert: true, new: true, runValidators: true });
    return res.json({ success: true, message: 'Push device registered' });
  } catch (e) { console.error('Device registration error', e); return res.status(500).json({ success: false, message: 'Device registration failed' }); }
}
export async function unregisterPushDevice(req, res) {
  if (!allowed(req)) return res.status(403).json({ success: false, message: 'Unsupported role' });
  const { token } = req.body || {};
  if (typeof token !== 'string' || !token) return res.status(400).json({ success: false, message: 'Token required' });
  await PushDevice.deleteOne({ token, ...identity(req) });
  return res.json({ success: true });
}
