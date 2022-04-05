/**
 * Controlador de operaciones para usuarios
 * @module api/user/user-controller
 */
import Usuario from '../../model/user-model.mjs'

/**
 * Obtener listado de todo los usuarios
 * @param {Object} req - Petición (request) recibida por http con los datos necesarios
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Lista de usuarios en la base de datos
 */
export function index(req, res){
    Usuario.find()
    .exec((err, usuarios) => {
        if(err)
            return res.status(500).json({message: err});
        return res.json({usuarios: usuarios});
    });
}