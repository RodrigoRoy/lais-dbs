import express from 'express';
const router = express.Router();
import * as controller from './files-controller.mjs';
import * as auth from '../../services/auth-service.mjs';

router.post('/file/video', auth.requireLogin, controller.uploadVideo);
router.post('/file/image', auth.requireLogin, controller.uploadImage);
router.post('/file/document', auth.requireLogin, controller.uploadDocument);

export default router;
