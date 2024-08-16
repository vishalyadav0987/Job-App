const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // image URL
        resumeOriginalName: { type: String },
        comapanyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company",
        },
        profilePic: {
            type: String,
            default: ""
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema)

