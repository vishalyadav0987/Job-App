const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { // company name
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    logoImg: {
        type: String,
    },
    userId: { // jisne user ki company hai
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("company", CompanySchema)