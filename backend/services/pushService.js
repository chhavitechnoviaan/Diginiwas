import { getMessaging } from 'firebase-admin/messaging';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import fs from 'node:fs';
import PushDevice from '../models/PushDevice.js';

function firebaseApp() {
  if (getApps().length) return getApps()[0];
  let credentials;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    credentials = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8'));
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    credentials = { projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') };
  } else throw new Error('Firebase service account not configured');
  return initializeApp({ credential: cert(credentials) });
}

export async function pushNotification(notification) {
  if (!['buyer','seller','partner','admin'].includes(notification.userRole)) return { sent: 0 };
  const devices = await PushDevice.find({ userId: notification.userId, userRole: notification.userRole, enabled: true }).lean();
  if (!devices.length) return { sent: 0 };
  const tokens = devices.map(d => d.token);
  const data = {
    notificationId: String(notification._id), type: String(notification.type || 'GENERAL'),
    actionUrl: String(notification.actionUrl || ''), entityType: String(notification.entityType || ''),
    entityId: notification.entityId ? String(notification.entityId) : '',
  };
  const result = await getMessaging(firebaseApp()).sendEachForMulticast({
    tokens, notification: { title: notification.title, body: notification.message || '' }, data,
    android: { priority: 'high' }, apns: { payload: { aps: { sound: 'default' } } }
  });
  const invalid = [];
  result.responses.forEach((response, index) => {
    if (!response.success) {
      const code = response.error?.code;
      if (['messaging/registration-token-not-registered', 'messaging/invalid-registration-token'].includes(code)) invalid.push(tokens[index]);
      else console.error('FCM delivery error:', code);
    }
  });
  if (invalid.length) await PushDevice.deleteMany({ token: { $in: invalid } });
  return { sent: result.successCount, failed: result.failureCount };
}
