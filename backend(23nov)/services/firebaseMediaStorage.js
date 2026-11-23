/** Cloudinary-compatible upload response, backed by Firebase Cloud Storage for new files. */
import { randomUUID } from "node:crypto";
import { Writable, Readable } from "node:stream";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { getMediaBucket } from "../config/firebaseStorage.js";
import legacyCloudinary from "../config/cloudinary.js";

const extensionByMime = new Map([
  ["image/jpeg", ".jpg"], ["image/jpg", ".jpg"], ["image/png", ".png"],
  ["image/webp", ".webp"], ["image/avif", ".avif"],
  ["video/mp4", ".mp4"], ["video/webm", ".webm"],
  ["video/quicktime", ".mov"], ["video/x-m4v", ".m4v"],
  ["application/pdf", ".pdf"], ["application/msword", ".doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx"],
]);

export const isFirebaseId = (id) => typeof id === "string" && id.startsWith("firebase:");

function folderName(input) {
  const value = String(input || "diginiwas/uploads");
  if (!/^[a-zA-Z0-9_/-]+$/.test(value) || value.split("/").some(x => !x || x === "." || x === "..")) {
    throw new Error("Invalid Firebase media folder");
  }
  return value;
}

/** Download token links are persistent for public listings; protect sensitive uploads separately. */
function firebaseDownloadUrl(bucketName, objectName, token) {
  return `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucketName)}/o/${encodeURIComponent(objectName)}?alt=media&token=${token}`;
}

export async function storeStream(readStream, { folder, mimetype, filename }) {
  const extension = extensionByMime.get(mimetype);
  if (!extension) throw new Error(`File type is not permitted: ${mimetype}`);
  const bucket = getMediaBucket();
  const objectName = `${folderName(folder)}/${randomUUID()}${extension}`;
  const token = randomUUID();
  const object = bucket.file(objectName);
  const writeStream = object.createWriteStream({
    resumable: false,
    validation: "crc32c",
    metadata: {
      contentType: mimetype,
      metadata: { firebaseStorageDownloadTokens: token },
      cacheControl: "public, max-age=3600",
    },
  });
  try {
    await pipeline(readStream, writeStream);
  } catch (error) {
    await object.delete({ ignoreNotFound: true }).catch(() => {});
    throw error;
  }
  const url = firebaseDownloadUrl(bucket.name, objectName, token);
  return {
    provider: "firebase",
    storagePath: objectName,
    path: url,
    secure_url: url,
    url,
    filename: `firebase:${objectName}`,
    public_id: `firebase:${objectName}`,
    mimetype,
    originalname: filename || "",
  };
}

/** Dispatches deletes to Firebase for new uploads, Cloudinary for legacy identifiers. */
export async function destroyMedia(publicId, options = {}) {
  if (!publicId) return { result: "not found" };
  if (isFirebaseId(publicId)) {
    await getMediaBucket().file(publicId.slice("firebase:".length)).delete({ ignoreNotFound: true });
    return { result: "ok" };
  }
  return legacyCloudinary.uploader.destroy(publicId, options);
}

/** Compatibility façade for older CMS controllers using cloudinary.uploader. */
export const mediaUploader = {
  destroy: destroyMedia,
  async upload(filePath, options = {}) {
    if (typeof filePath !== "string" || /^https?:\/\//i.test(filePath)) {
      throw new Error("Expected local file path. Uploaded Multer files already expose path and filename.");
    }
    const ext = filePath.toLowerCase().split(".").pop();
    const mimetype = ({jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", webp:"image/webp", mp4:"video/mp4", webm:"video/webm", mov:"video/quicktime", pdf:"application/pdf"})[ext];
    return storeStream(createReadStream(filePath), {folder: options.folder || "diginiwas/uploads", mimetype, filename: filePath});
  },
  upload_stream(options, callback) {
    const chunks = [];
    let total = 0;
    return new Writable({
      write(chunk, _encoding, done) {
        total += chunk.length;
        if (total > 10 * 1024 * 1024) return done(new Error("CMS image exceeds 10 MB"));
        chunks.push(chunk);
        done();
      },
      final(done) {
        try {
          const buffer = Buffer.concat(chunks);
          const mime = options?.contentType || detectImageMime(buffer);
          storeStream(Readable.from(buffer), {
            folder: options?.folder || "diginiwas/blog",
            mimetype: mime,
          }).then(result => { callback?.(null, result); done(); }).catch(err => { callback?.(err); done(err); });
        } catch (error) {
          callback?.(error);
          done(error);
        }
      },
    });
  },
};

function detectImageMime(buffer) {
  if (buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return "image/jpeg";
  if (buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return "image/png";
  if (buffer.toString("ascii",0,4)==="RIFF" && buffer.toString("ascii",8,12)==="WEBP") return "image/webp";
  if (buffer.toString("ascii",4,12).startsWith("ftypavif")) return "image/avif";
  throw new Error("Unsupported CMS image content");
}
export default { uploader: mediaUploader };
