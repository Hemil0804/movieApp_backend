const multer = require("multer");
require("dotenv").config();
const path = require("path");
const fs = require("fs-extra");
const { SERVERERROR, FAILURE, APP_URL } = require("../../config/key");
const responseHelper = require("../helpers/responseHelper");
var imgPath = path.join(__dirname, "../../public/uploads/movie/");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // let reqParam=req.body
        // console.log(req.formData,'req')
        if (file.fieldname == 'profilePic') {
            imgPath = path.join(__dirname, `../../public/uploads/movie/${reqParam.userId}/`);
        }
        if (!fs.existsSync(imgPath)) {
            fs.mkdirSync(imgPath, { recursive: true }, (err) => {
            });
        }
        cb(null, imgPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

module.exports.uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 60 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg+xml|svg)$/)) {
            return cb(new Error("Please upload an image!"), false);
        }
        cb(undefined, true);
    },
});

module.exports.validMulterUploadMiddleware = (multerUploadFunction) => {
    return (req, res, next) =>
        multerUploadFunction(req, res, (err) => {
            // handle Multer error

            if (err && err.name && err.name === "MulterError") {
                return responseHelper.error(res, res.__("SomethingWentWrongPleaseTryAgain"), SERVERERROR);
            }

            if (err) {
                // handle other errors
                return responseHelper.error(res, res.__("UploadValidImage"), FAILURE);
            }
            next();
        });
};
