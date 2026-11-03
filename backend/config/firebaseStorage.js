/** Firebase Storage bucket: initialized lazily so the backend can start before credentials are configured. */
import { readFileSync } from "node:fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

function firebaseApp() {
  if (getApps().length) return getApps()[0];
  let credential;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    credential = cert(JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, "utf8")));
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    credential = cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
  } else {
    throw new Error("Firebase credentials not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON, FIREBASE_SERVICE_ACCOUNT_PATH, or FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY.");
  }
  return initializeApp({ credential });
}

export function getMediaBucket() {
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucketName) throw new Error("FIREBASE_STORAGE_BUCKET is not configured");
  return getStorage(firebaseApp()).bucket(bucketName);
}


// import admin from "firebase-admin";
// import fs from "node:fs";

// function loadFirebaseCredentials() {
//   const credentialsJson =
//     process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

//   // Prefer environment variable
//   if (credentialsJson) {
//     return JSON.parse(credentialsJson);
//   }

//   // Fallback to mounted secret file
//   const credentialsPath =
//     process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

//   if (credentialsPath) {
//     if (!fs.existsSync(credentialsPath)) {
//       throw new Error(
//         `Firebase credentials file not found: ${credentialsPath}`
//       );
//     }

//     return JSON.parse(
//       fs.readFileSync(credentialsPath, "utf8")
//     );
//   }

//   throw new Error(
//     "Firebase credentials not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH."
//   );
// }

// export function getFirebaseBucket() {
//   if (!admin.apps.length) {
//     const credentials = loadFirebaseCredentials();

//     admin.initializeApp({
//       credential: admin.credential.cert(credentials),
//       storageBucket: process.env.FIREBASE_STORAGE_BUCKET
//     });
//   }

//   return admin.storage().bucket();
// }
