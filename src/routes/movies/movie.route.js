const express = require('express')
const router = express.Router()
const movieController = require('../../controllers/movies/movie.controller')
const { verifyAuthToken } = require('../../middleware/verifyToken')
const { uploadImage, validMulterUploadMiddleware } = require("../../middleware/uploadImage");


router.post("/list", verifyAuthToken, movieController.getList);
router.post("/add-edit", verifyAuthToken, validMulterUploadMiddleware(uploadImage.single("image")), movieController.addEdit);
router.post("/get-movie", verifyAuthToken, movieController.getMovieData);
module.exports = router
