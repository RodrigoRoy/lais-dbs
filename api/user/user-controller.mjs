/**
* Controlador de operaciones para usuarios
* @module api/user/user-controller
*/
import Usuario from '../../model/user-model.mjs'

/**
* Obtener listado de todo los usuarios
* @param {Object} req - Petición (request) recibida por http
* @param {Object} res - Respuesta (response) a enviar por http
* @returns Lista de usuarios en la base de datos
*/
export function index(req, res){
    Usuario.find()
    .exec((err, usuarios) => {
        if(err)
            return res.status(500).json({message: err});
        return res.status(200).json({usuarios: usuarios});
    });
}

/**
 * Obtiene la información de un usario mediante su id
 * @param {Object} req - Petición (request) recibida por http con id del usuario
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Objeto con todas las propiedas del usuario
 */
export function show(req, res){
    // TODO @RodrigoRoy Solamente usuarios con permisos suficientes pueden editar
    Usuario.findOne({_id: req.params.id}, (error, usuario) => {
        if(error)
            return res.status(500).json({message: error})
        if(!usuario)
            return res.status(400).json({message: 'El usuario no existe'})
        return res.status(200).json({usuario: usuario, message: 'Usuario obtenido correctamente'})
    })
}

/**
 * Actualiza la información de un usuario
 * @param {Object} req - Petición (request) recibida por http con los datos de usuario a actualizar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Mensaje de confirmación en actualización o mensaje de error
 */
export function update(req, res){
    // TODO: @RodrigoRoy Solamente usuarios con permisos suficientes pueden editar
    const usuario = new Usuario(req.body.usuario);
    
    // findByIdAndUpdate() requiere que el segundo parámetro sea un UpdateQuery (incluye $set). Alternativamente usar opción "overwrite"
    // Video.findOneAndReplace({_id: video._id}, video, error => {
    Usuario.findByIdAndUpdate({_id: usuario._id}, usuario, {overwrite: true}, (error, document) => {
        if(error){
            return res.status(500).json({message: error})
        }
        if(!usuario.username){
            return res.status(400).json({message: 'Registro de usuario vacio. Verificar propiedades \'usuario\', \'usuario._id\', \'usuario.username\''});
        }
        if(!document){
            return res.status(400).json({message: `El registro con id ${usuario._id} no existe`});
        }
        return res.status(200).json({message: 'Usuario actualizado correctamente'})
    })
}

/**
 * Elimina un usuario de la base de datos
 * @param {Object} req - Petición (request) recibida por http con id del usuario a eliminar
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns Mensaje de confirmación al eliminar o mensaje de error
 */
export function remove(req, res){
    // TODO @RodrigoRoy Solamente usuarios con permisos suficientes pueden borrar
    Usuario.findByIdAndDelete({_id: req.params.id}, (error, usuario) => {
        if(error){
            return res.status(500).json({message: error});
        }
        if(!usuario){
            return res.status(400).json({message: `El registro con id ${req.params.id} no existe`});
        }
        return res.status(200).json({message: `Usuario ${usuario.username} borrado`});
    });
}