const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String,
        required: true,
    }],
    salary: {
        type: Number,
        required: true,
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    comapanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true,
    },
    created_By: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // job kisne create ki hai it means kon recrewreture hai
        required: true,
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
    }],
}, { timestamps: true });

module.exports = mongoose.model("job", JobSchema)