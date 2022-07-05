import express from 'express';
const router = express.Router();
import * as controller from './files-controller.mjs';
import multer from 'multer' // middleware para subir archivos

const upload = multer({ dest: 'uploads/'}) // ruta de los archivos

// TODO: Middleware require también verificación (auth.requireLogin)

// 'file' debe coincider con el nombre en formData.append('file', fileImage) desde formulario front-end
router.post('/upload/image', upload.single('file'), controller.uploadImage);

export default router;
