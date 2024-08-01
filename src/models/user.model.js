const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String,
        index: true
    },
    status: {
        type: Number,
        default: 1,
        Enum: [1, 2, 3],
        index: true
    }
}, { collection: "users", timestamps: true });

module.exports = mongoose.model("users", UserSchema);
