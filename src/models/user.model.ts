import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    // Authentication
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    // Contact
    phone: {
        type: String,
        unique: true,
        sparse: true,
    },

    // Personal Data
    age: {
        type: Number,
        min: 18,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, { timestamps: true })

const User = mongoose.model("USER", userSchema);

export default User;