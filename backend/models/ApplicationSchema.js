const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true,
    },
    applicantId: { // 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("application", ApplicationSchema)