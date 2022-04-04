import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {type: String, minlength: 3, maxlength: 30, trim: true, required: true, index: {unique: true}},
    fullname: {type: String, maxlength: 50, trim: true, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false},
    admin: {type: Boolean, default: false},
    operation: {
        create: {type: Boolean, default: true},
        read: {type: Boolean, default: true},
        update: {type: Boolean, default: true},
        delete: {type: Boolean, default: false},
        _id: false
    },
    active: {type: Boolean, default: true}
});

userSchema.set('timestamps', true);

userSchema.statics.passwordMatches = function(password, hash){
    return bcrypt.compareSync(password, hash)
};
userSchema.pre('save', function(next){
    // this.username = this.username.toLowerCase();
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword);
    next();
});

export default mongoose.model('user', userSchema);