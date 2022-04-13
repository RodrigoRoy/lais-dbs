/**
 * Definición (esquema) de un usuario del sistema
 * @module model/user-model
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {type: String, minlength: 3, maxlength: 30, trim: true, required: true, index: {unique: true}},
    fullname: {type: String, maxlength: 50, trim: true, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false},
    operation: {
        create: {type: Boolean, default: true},
        read: {type: Boolean, default: true},
        update: {type: Boolean, default: true},
        delete: {type: Boolean, default: false},
        _id: false
    },
    admin: {type: Boolean, default: false},
    active: {type: Boolean, default: true}
});

userSchema.set('timestamps', true); // Habilita propiedadaes: createdAt, updatedAt
userSchema.set('collection', 'usuarios'); // Nombre de la colección en la base de datos

/**
 * Compara la contraseña no-encriptada con su versión encriptada en la base de datos
 * @param {string} password - Contraseña no-encriptada (recibida por http)
 * @param {string} hash - Contraseña encriptada (almacenada en base de datos)
 * @returns True si las contraseñas son equivalentes, false en otro caso
 */
userSchema.statics.passwordMatches = function(password, hash){
    return bcrypt.compareSync(password, hash)
};

/**
 * Acciones a realizar previo al guardado en base de datos
 * En este caso, se encripta la contraseña
 */
userSchema.pre('save', function(next){
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword);
    next();
});

/**
 * Generación del modelo de usuario a partir del esquema 
 */
export default mongoose.model('user', userSchema);