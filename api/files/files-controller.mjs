/**
 * Sube al servidor un archivo de imagen
 * @param {Object} req - Petición (request) recibida por http
 * @param {Object} res - Respuesta (response) a enviar por http
 */
export function uploadImage(req, res){
    res.status(200).json({ file: req.file, message: 'Image uploaded successfully'});
}