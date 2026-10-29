// import { getApps, initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
//   appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
// };

// const requiredFirebaseConfig = ["apiKey", "authDomain", "projectId", "appId"];
// const missing = requiredFirebaseConfig.filter((key) => !firebaseConfig[key]);

// if (missing.length) {
//   // Do not print API key values or other configuration secrets to the console.
//   console.error(`[Firebase] Missing required VITE_FIREBASE_* configuration: ${missing.join(", ")}`);
// }

// const existingDefaultApp = getApps().find((item) => item.name === "[DEFAULT]");
// const app = existingDefaultApp || initializeApp(firebaseConfig);

// export const firebaseAuth = getAuth(app);

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
};

const requiredFirebaseConfig = ["apiKey", "authDomain", "projectId", "appId"];
const missing = requiredFirebaseConfig.filter((key) => !firebaseConfig[key]);

if (missing.length) {
  // Do not print API key values or other configuration secrets to the console.
  console.error(`[Firebase] Missing required VITE_FIREBASE_* configuration: ${missing.join(", ")}`);
}

const existingDefaultApp = getApps().find((item) => item.name === "[DEFAULT]");
const app = existingDefaultApp || initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
