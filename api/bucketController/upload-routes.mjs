import express from 'express';
const router = express.Router();
import * as controller from './upload-controller.mjs';

router.post("/upload", controller.uploadFiles);
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);

export default router;