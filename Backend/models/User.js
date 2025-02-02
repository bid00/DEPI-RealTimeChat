const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    username: {
        type: String,
       
    },
     phone: {
        type: String,
        
    },
     profilePicture: {
        type: String,  
        default: '',   
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    googleId: { type: String }, 
    facebookId: { type: String }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
