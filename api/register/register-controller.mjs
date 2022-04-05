/**
 * Controlador para registro de usuarios (sign in)
 * @module api/register/register-controller
 */

import * as StringUtil from '../../utilities/string-util.mjs';
import User from '../../model/user-model.mjs';

/**
 * Registro de nuevo usuario
 * @see model/user-model
 * @param {Object} req - Petición (request) recibida por http con los datos necesarios
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con mensaje en caso éxitoso de la creación de usuario o mensaje de error
 */
export function index(req, res){
    // Verificación de datos no-vacios en petición (req.body)
    const validation = validateIndex(req.body);
    if(!validation.isValid){
        return res.status(400).json({message: validation.message});
    }
    
    const user = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
        operation: req.body.operation,
        active: req.body.active,
    });
    user.save(error => {
        if(error){
            if(error.code === 11000){
                return res.status(403).json({message: 'Nombre de usuario ya en uso'});
            }
            return res.status(500).json({message: err});
        }
        return res.status(201).json({message: 'Usuario creado exitosamente'});
    });
}

/**
 * Verifica que los valores del cuerpo de la petición no sean vacios
 * @see model/user-model
 * @param {Object} body - Cuerpo de la petición por http (req.body)
 * @returns Objeto con propiedad booleana isValid que indica si los valores requeridos no son vacios.
 * Adicionalmente la propiedad message indica con texto los posibles errores.
 */
function validateIndex(body){
    let errors = '';
    // TODO: Validaciones para el resto de campos (admin, operation, active)
    if(StringUtil.isEmpty(body.username)){
        errors += 'Username is required. ';
    }
    if(StringUtil.isEmpty(body.fullname)){
        errors += 'Fullname is required. ';
    }
    if(StringUtil.isEmpty(body.email)){
        errors += 'Email is required. ';
    }
    if(StringUtil.isEmpty(body.password)){
        errors += 'Password is required. ';
    }
    
    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}
