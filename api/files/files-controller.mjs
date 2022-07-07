import multer from 'multer' // middleware para subir archivos
import * as fs from 'fs' // biblioteca para manejo de archivos en sistema (filesystem)

/**
 * Sube al servidor un archivo de video
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
 export function uploadVideo(req, res){
    const uploadDir = 'files/video'; // ubicación para subir archivo
    // verificar que la ubicación exista, de lo contrario, crearla
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, {recursive: true})
    }
    // configuración de ruta de archivos subidos y renombramiento de archivos
    const storage = multer.diskStorage({
        destination: function(req, res, cb){
            cb(null, uploadDir)
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname) // conservar nombre y extensión original del archivo
        }
    });
    // configuración de limites en cantidad y peso de archivos subidos
    const limits = {
        fields: 10, // máxima cantidad de campos que no son archivos
        fileSize: 1024*1024*100, // tamaño máximo de archivo, 100MB
        files: 10, // máxima cantidad de campos que son archivos
        parts: 20 // máxima cantidad de campos (archivos y no-archivos)
    };
    // configuración de aceptación por tipo de archivo
    const fileFilter = function(req, file, cb){
        if(/video.*/.test(file.mimetype)){ // regex para aceptar solo videos
            cb(null, true);
        }
        else{ // error personalizado cuando no se trata de un archivo de video
            const error = new multer.MulterError();
            error.message = 'Mimetype not accepted by fileFilter';
            error.code = 'INCORRECT_FILETYPE';
            cb(error);
        }
    };
    // 'video' debe coincider con el nombre en formData.append('video', videoFile) desde formulario front-end
    const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter}).single('video');

    // subida auto-mágica de archivos con Multer
    upload(req, res, function(err){
        // console.log('req.file: ', req.file); // file info
        // console.log('req.body: ', req.body); // (extra) data info
        // errores de Multer
        if (err instanceof multer.MulterError){
            if(err.code === 'LIMIT_FILE_SIZE')
                return res.status(413).json({ message: 'El archivo pesa demasiado'});
            if(err.code === 'INCORRECT_FILETYPE')
                return res.status(415).json({ message: 'El archivo no es un video'});
            return res.status(400).json({ message: 'No se pudo procesar el archivo enviado'});
        }
        // cualquier otro error
        if (err){
            return res.status(500).json({ message: 'Error al subir el archivo'});
        }
        // código cuando no hay error:
        // Post-procesamiento del archivo, por ejemplo, renombrar y crear versiones de baja resolución
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