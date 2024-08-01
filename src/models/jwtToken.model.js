const mongoose = require("mongoose");

const jwtTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    token: {
        type: String,
        index: true
    },
    userType: {
        type: Number,
        enum: [1, 2], // 1: user, 2: Admin
    },
    status: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    }
}, { collection: "jwtToken", timestamps: true });

module.exports = mongoose.model("jwtToken", jwtTokenSchema);