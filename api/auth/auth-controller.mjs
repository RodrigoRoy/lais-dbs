/**
 * Acciones de autentificación relacionadas a usuarios en base de datos
 * @module api/auth/auth-controller
 */

import * as StringUtil from '../../utilities/string-util.mjs'
import User from '../../model/user-model.mjs'
import { generateJWT } from '../../services/auth-service.mjs'

/**
 * Valida si el username y password son válidos
 * @param {Object} req - Petición (request) recibida por http que incluye username y password
 * @param {Object} res - Respuesta (response) a enviar por http
 * @returns JSON con token en formato JWT de los valores principales del usuario o mensaje de error
 */
export function index(req, res){
    // Verificación de datos no-vacios en petición (req.body)
    const validation = validateIndex(req.body);
    if(!validation.isValid){
        return res.status(400).json({message: validation.message});
    }

    // TODO Explicitar petición de contraseña en función findOne
    User.findOne({username: req.body.username}, {password: true}, (error, user) => {
        console.log('Datos de usuario: ', user);
        if(error){
            return res.status(500).json({message: error});
        }
        if(!user){
            return res.status(401).json({message: 'El usuario no existe'});
        }
        
        const passwordMatch = User.passwordMatches(req.body.password, user.password);
        if(!passwordMatch){
            return res.status(401).json({message: 'Contraseña incorrecta'});
        }
        const token = generateJWT(user);
        return res.status(200).json({token: token, message: 'Autentificación correcta'});
    });
}

/**
 * Verifica que los valores del cuerpo de la petición no sean vacios (username y password)
 * @param {Object} body - Cuerpo de la petición por http (req.body)
 * @returns Objeto con propiedad booleana isValid que indica si los valores requeridos no son vacios.
 * Adicionalmente la propiedad message indica con texto los posibles errores.
 */
function validateIndex(body){
    let errors = '';
    if(StringUtil.isEmpty(body.username)){
        errors += 'Username is required. ';
    }
    if(StringUtil.isEmpty(body.password)){
        errors += 'Password is required. ';
    }
    
    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}