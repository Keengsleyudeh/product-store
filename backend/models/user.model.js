import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },  
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        // required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        default: 'user'
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

export default User;

