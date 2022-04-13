import jwt from 'jsonwebtoken'

/**
 * Genera un nuevo Token JWT.
 * @param {Object} user - usuario al cual generar Token
 * @returns un token para el usuario
 */
export function generateJWT(user){
    const tokenData = {
        username: user.username,
        fullname: user.fullname,
        operation: user.operation, 
        admin: user.admin,
        active: user.active,
        id: user._id
    };
    return jwt.sign({user: tokenData}, process.env.MY_TOKEN, {expiresIn: '7d'}); // Token válido durante 7 días
}

/**
 * Realiza el requerimiento de inicio de sesión a partir de un token de usuario.
 * @param {Object} req - Petición (request) recibida por http, incluye jwt en encabezado "authorization"
 * @param {Object} res - Respuesta (response) a enviar por http
 * @param {Object} next - Rutina que continúa después de las operaciones de decodificación de token. 
 * @returns Un error si la sesión no está iniciada.
 */
export function requireLogin(req, res, next){
    const token = decodeToken(req);
    if(!token){
        return res.status(401).json({message: 'Debes de tener sesión iniciada.'});
    }
    next();
}

/**
 * Decodifica el token de un usuario a partir del request.
 * @param {Object} req - Petición (request) recibida por http, incluye jwt en encabezado "authorization"
 * @returns Payload (tokenData) decodificado en caso de existir o null en otro caso.
 */
export function decodeToken(req){
    const token = req.headers.authorization || req.headers['authorization'];
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token, process.env.MY_TOKEN);
    }catch(error){
        return null;
    }
}

/**
 * Obtiene el username de un usuario.
 * @param {Object} req - Petición (request) recibida por http.
 * @returns username de usuario en caso de existir o null en otro caso.
 */
export function getUsername(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.username;
}

/**
 * Obtiene el nombre completo (fullname) de un usuario.
 * @param {Object} req - Petición (request) recibida por http.
 * @returns fullname de usuario en caso de existir o null en otro caso.
 */
 export function getUserFullname(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.fullname;
}

/**
 * Obtiene las operaciones del usuario.
 * @param {Object} req - Petición (request) recibida por http.
 * @returns las operaciones del usuario en caso de existir o null en otro caso.
 */
 export function getUserOperation(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.operation;
}

/**
 * Obtiene el identificador para saber si un usuario es administrador.
 * @param {Object} req - Petición (request) recibida por http.
 * @returns el identificador para saber si un usuario es administrador o null en otro caso.
 */
export function getUserAdmin(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.admin;
}

/**
 * Obtiene el identificador para saber si un usuario está activo.
 * @param {Object} req - Petición (request) recibida por http.
 * @returns el identificador para saber si un usuario está activo o null en otro caso.
 */
 export function getUserActive(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.active;
}

/**
 * Obtiene el id del usuario.
 * @param {Object} req - Petición (request) recibida por http.
 * @returns el id del usuario en caso de existir o null en otro caso.
 */
export function getUserId(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.id;
}
