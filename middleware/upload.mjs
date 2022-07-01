import { promisify } from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { url as _url, database, fileBucket } from "../config/dbBucket.mjs";

var storage = new GridFsStorage({
  url: _url + database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "application/pdf"];
    console.log("File entry", file);
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-DATAFILE-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: fileBucket,
      filename: `${Date.now()}-DATAFILE-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = promisify(uploadFiles);
export default uploadFilesMiddleware;