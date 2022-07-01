import upload from "../../middleware/upload.mjs";
import { url as _url, database as _database, fileBucket } from "../../config/dbBucket.mjs";

import { MongoClient } from "mongodb";
import { GridFSBucket } from "mongodb";

const url = _url;

const baseUrl = "http://localhost:8081/files/";

const mongoClient = new MongoClient(url);

export async function uploadFiles(req, res) {
  try {
    await upload(req, res);
    console.log("req files",req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    await mongoClient.connect();

    
    const database = mongoClient.db(_database);
    const files = database.collection(fileBucket);
    
    console.log("req file to insertion",req.files[0]);
    files.insertOne(req.files[0]);

    return res.status(200).send({
      message: "Files have been uploaded.",
    });

    // console.log(req.file);

    // if (req.file == undefined) {
    //   return res.send({
    //     message: "You must select a file.",
    //   });
    // }

    // return res.send({
    //   message: "File has been uploaded.",
    // });
  } catch (error) {
    console.log("Error", error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });

    // return res.send({
    //   message: "Error when trying upload image: ${error}",
    // });
  }
};

export async function getListFiles(req, res) {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(_database);
    const images = database.collection(fileBucket);

    const cursor = images.find({});

    // if ((await cursor.count()) === 0) {
    //   return res.status(500).send({
    //     message: "No files found!",
    //   });
    // }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export async function download(req, res) {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(_database);
    const bucket = new GridFSBucket(database, {
      bucketName: fileBucket,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  uploadFiles,
  getListFiles,
  download,
};