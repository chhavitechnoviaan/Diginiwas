/** Multer StorageEngine with the same `path` and `filename` fields used by CloudinaryStorage. */
import { storeStream, destroyMedia } from "../services/firebaseMediaStorage.js";

export function firebaseMulterStorage({ folder }) {
  return {
    _handleFile(req, file, cb) {
      const destination = typeof folder === "function" ? folder(req, file) : folder;
      Promise.resolve(destination)
        .then(dir => storeStream(file.stream, {
          folder: dir,
          mimetype: file.mimetype,
          filename: file.originalname,
        }))
        .then(result => cb(null, result))
        .catch(cb);
    },
    _removeFile(req, file, cb) {
      destroyMedia(file.filename || file.public_id)
        .then(() => cb(null))
        .catch(cb);
    },
  };
}
