import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    birthdate: {
        type: Date,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    
    }
});

export const User = mongoose.model('User', userSchema);