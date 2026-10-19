// import { cert, getApps, initializeApp } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";

// const getFirebaseAdminApp = () => {
//   if (getApps().length) return getApps()[0];

//   const projectId = process.env.FIREBASE_PROJECT_ID;
//   const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
//   const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

//   if (!projectId || !clientEmail || !privateKey) {
//     throw new Error(
//       "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY."
//     );
//   }

//   return initializeApp({
//     credential: cert({
//       projectId,
//       clientEmail,
//       privateKey,
//     }),
//   });
// };

// export const firebaseAdminAuth = () => getAuth(getFirebaseAdminApp());


import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { existsSync, readFileSync } from "node:fs";

const getFirebaseAdminApp = () => {
  if (getApps().length) return getApps()[0];

  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    "/run/secrets/firebase-service-account.json";

  if (existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(
      readFileSync(serviceAccountPath, "utf8")
    );

    return initializeApp({
      credential: cert(serviceAccount),
    });
  }

  // Local development fallback
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin is not configured. Provide the service-account JSON file or valid Firebase environment variables."
    );
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
};

export const firebaseAdminAuth = () => getAuth(getFirebaseAdminApp());

