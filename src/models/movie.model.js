const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        index: true
    },
    year: {
        type: String,
        index: true
    },
    image: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
        Enum: [1, 2, 3],
        index: true
    }
}, { collection: "movie", timestamps: true });

module.exports = mongoose.model("movie", MovieSchema);
