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
import fs from "node:fs";

const getFirebaseAdminApp = () => {
  if (getApps().length) {
    return getApps()[0];
  }

  let serviceAccount;
  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (
    serviceAccountPath &&
    fs.existsSync(serviceAccountPath)
  ) {
    try {
      serviceAccount = JSON.parse(
        fs.readFileSync(serviceAccountPath, "utf8")
      );
    } catch (error) {
      throw new Error(
        `Unable to read Firebase service-account JSON: ${error.message}`
      );
    }
  } else {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "Firebase Admin is not configured. Provide a valid FIREBASE_SERVICE_ACCOUNT_PATH or set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY."
      );
    }

    serviceAccount = {
      projectId,
      clientEmail,
      privateKey,
    };
  }

  if (
    !serviceAccount.project_id &&
    !serviceAccount.projectId
  ) {
    throw new Error(
      "Firebase service account is missing project_id."
    );
  }

  if (
    !serviceAccount.client_email &&
    !serviceAccount.clientEmail
  ) {
    throw new Error(
      "Firebase service account is missing client_email."
    );
  }

  if (
    !serviceAccount.private_key &&
    !serviceAccount.privateKey
  ) {
    throw new Error(
      "Firebase service account is missing private_key."
    );
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
};

export const firebaseAdminAuth = () =>
  getAuth(getFirebaseAdminApp());
