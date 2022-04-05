// TODO Documentar @EmmanuelCruz
import jwt from 'jsonwebtoken'

export function generateJWT(user){
    const tokenData = {
        username: user.username, 
        operation: user.operation, 
        admin: user.admin, 
        id: user._id
    };
    return jwt.sign({user: tokenData}, process.env.MY_TOKEN);
}

export function requireLogin(req, res, next){
    const token = decodeToken(req);
    if(!token){
        return res.status(401).json({message: 'Debes de tener sesión iniciada.'});
    }
    next();
}

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

export function getUsername(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.username;
}

export function getUserId(req){
    const token = decodeToken(req);
    if(!token){
        return null;
    }
    return token.user.id;
}

// TODO @EmmanuelCruz implementar obtención de permisos de usuario @see model/user-model
export function getUserOperation(req){
    return null;
}

export function getUserAdmin(req){
    return null;
}