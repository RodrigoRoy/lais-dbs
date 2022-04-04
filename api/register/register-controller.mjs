import * as StringUtil from '../../utilities/string-util.mjs';
import User from '../../model/user-model.mjs';

export function index(req, res){
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
                return res.status(403).json({message: 'Username is already taken'});
            }
            return res.status(500).json();
        }
        return res.status(201).json();
    });
}

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
