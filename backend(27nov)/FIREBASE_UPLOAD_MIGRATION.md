# Diginiwas Firebase Storage migration

New Seller KYC uploads now use the existing Firebase Multer storage engine, like the existing CMS and property media routes. `file.path` and `file.filename` remain compatible with existing controllers. The `firebase:` public ID supports deletion in `destroyMedia`.

## Configuration (backend .env)

Set `FIREBASE_STORAGE_BUCKET` to your actual Firebase Storage bucket name.
Choose one credential option:

- `FIREBASE_SERVICE_ACCOUNT_PATH=C:/secure/location/firebase-service-account.json`
- `FIREBASE_SERVICE_ACCOUNT_JSON` (service account JSON string)
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

Never commit service account credentials. On Windows, avoid Docker-only paths such as `C:\run\secrets\firebase-service-account.json` unless the file actually exists.

## Migration scope

- Existing CMS controllers already import `services/firebaseMediaStorage.js` for uploads and deletes.
- Existing Property upload uses Firebase media storage.
- Seller KYC upload was the remaining direct CloudinaryStorage integration and is now Firebase.
- Legacy Cloudinary deletion support remains in `firebaseMediaStorage.js` for already-uploaded files. This is NOT a new-upload path.
- Previously uploaded Cloudinary URLs remain unchanged. A separate object-copy/data migration is required to move historical files.
- Do not upload private KYC documents to publicly accessible Firebase download URLs. Current `storeStream` returns persistent download-token URLs; restrict access and implement authenticated KYC retrieval before production use.

## Verification

Run `npm install`, `node --check middleware/sellerKycUpload.js`, then test actual image uploads with Firebase credentials configured. No live Firebase integration test was performed here.
