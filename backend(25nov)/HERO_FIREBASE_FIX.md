# Hero Section Firebase upload fix

## Root cause
The Hero Section route already used Firebase-backed Multer, but replacing/deleting an older Hero image invoked `destroyMedia()` with a legacy Cloudinary `public_id`. That function still called the Cloudinary API and failed with `cloud_name is disabled`, aborting the CMS save.

## Fix
- New image uploads remain Firebase Storage (`middleware/upload.js` + `firebaseMulterStorage.js`).
- Hero Section uses `destroyMedia` directly.
- Firebase `firebase:` identifiers are deleted from Firebase Storage.
- Legacy Cloudinary identifiers are skipped instead of calling a disabled Cloudinary account. Existing legacy URLs are not migrated or deleted; migrate those separately if required.
- No Firebase private keys are bundled.

## Configuration
Set `FIREBASE_STORAGE_BUCKET` and one supported credential configuration (`FIREBASE_SERVICE_ACCOUNT_PATH`, `FIREBASE_SERVICE_ACCOUNT_JSON`, or the FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY trio). Ensure the path exists on your local machine and restart the backend on port 5000. Never commit the service-account JSON.

## Test
1. Admin CMS > Hero Section > Replace Phone Image 1 > Save Hero Section.
2. Check POST `/api/v1/cms/hero` returns success.
3. GET `/api/v1/cms/hero` should contain `heroImage1.url` starting with `https://firebasestorage.googleapis.com/` and `heroImage1.public_id` starting with `firebase:`.
4. Check GET `/api/v1/home/feed` for CMS banners. Home feed inclusion depends on active Hero record and mapped image fields.

No live Firebase integration test was performed.
