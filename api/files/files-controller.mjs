import multer from 'multer' // middleware para subir archivos

/**
 * Sube al servidor un archivo de video
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
 export function uploadVideo(req, res){
    // 'video' debe coincider con el nombre en formData.append('video', videoFile) desde formulario front-end
    const upload = multer({ dest: 'uploads/'}).single('video');

    upload(req, res, function(err){
        if (err instanceof multer.MulterError){ // error de Multer
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        if (err){ // cualquier otro error
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        res.status(200).json({ file: req.file, message: 'Video subido correctamente'});
    });
}

/**
 * Sube al servidor un archivo de imagen
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
export function uploadImage(req, res){
    // 'image' debe coincider con el nombre en formData.append('image', imageFile) desde formulario front-end
    const upload = multer({ dest: 'uploads/'}).single('image');

    upload(req, res, function(err){
        if (err instanceof multer.MulterError){ // error de Multer
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        if (err){ // cualquier otro error
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        res.status(200).json({ file: req.file, message: 'Imagen subida correctamente'});
    });
}

/**
 * Sube al servidor un documento de texto (pdf)
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
 export function uploadDocument(req, res){
    // 'document' debe coincider con el nombre en formData.append('document', documentFile) desde formulario front-end
    const upload = multer({ dest: 'uploads/'}).single('document');

    upload(req, res, function(err){
        if (err instanceof multer.MulterError){ // error de Multer
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        if (err){ // cualquier otro error
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        res.status(200).json({ file: req.file, message: 'Documento subido correctamente'});
    });
}