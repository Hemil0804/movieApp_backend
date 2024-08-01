const mongoose = require("mongoose");
const { DB_AUTH_URL } = require("../../config/key");
console.log("DB_AUTH_URL >>>", DB_AUTH_URL);

mongoose.set("strictQuery", false);
mongoose.connect(DB_AUTH_URL, {
    // keepAlive: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useFindAndModify: false
});

mongoose.connection.on("error", (err) => {
    console.log("err", err);
    throw err;
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
});

module.exports = { mongoose }