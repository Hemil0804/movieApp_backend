
const movieModel = require('../../models/movie.model');
const responseHelper = require('../../helpers/responseHelper');
const { ACTIVE_STATUS,
    INACTIVE_STATUS,
    DELETED_STATUS,
    META_STATUS_0,
    META_STATUS_1,
    SUCCESS,
    FAILURE,
    JWT_AUTH_TOKEN_SECRET,
    JWT_EXPIRES_IN,
    SERVERERROR,
    IMAGE_LINK,
    UNVERIFIED_STATUS,
    APP_WEB_LINK,
    OTP_TIMEOUT } = require("../../../config/key")
const movieValidation = require('../../services/validation/movieValidation')
const path = require("path");
const fs = require('fs');

exports.getList = async (req, res) => {
    try {
        let reqParam = req.body;
        let movieService = await movieModel.find({ userId: reqParam.userId, status: ACTIVE_STATUS });
        if (movieService.length > 0) {
            return responseHelper.successapi(res, res.__('movieListSuccess'), META_STATUS_1, SUCCESS, movieService);
        } else {
            return responseHelper.successapi(res, res.__('movieListEmpty'), META_STATUS_1, SUCCESS, movieService);
        }

    } catch (e) {
        console.log(`Error from catch: ${e}`, e)
        // logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__('SomethingWentWrongPleaseTryAgain'), SERVERERROR);
    }
}
exports.getMovieData = async (req, res) => {
    try {
        let reqParam = req.body;
        let userMovieExist = await movieModel.findOne({ _id: reqParam.movieId, userId: reqParam.userId, status: ACTIVE_STATUS });
        if (!userMovieExist) return responseHelper.successapi(res, res.__('userMovieDoesNotExists'), META_STATUS_0, SUCCESS);
            
        let movieService = await movieModel.findOne({ userId: reqParam.userId, status: ACTIVE_STATUS });
        if (movieService) {
            return responseHelper.successapi(res, res.__('movieDataSuccess'), META_STATUS_1, SUCCESS, movieService);
        } else {
            return responseHelper.successapi(res, res.__('movieDataEmpty'), META_STATUS_1, SUCCESS, movieService);
        }
    } catch (e) {
        console.log(`Error from catch: ${e}`, e)
        // logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__('SomethingWentWrongPleaseTryAgain'), SERVERERROR);
    }
}



exports.addEdit = async (req, res) => {
    try {
        let reqParam = req.body;
        if (reqParam.movieId) {
            let validationMessage = await movieValidation.editmovieValidation(reqParam);
            if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);

            let userMovieExist = await movieModel.findOne({ _id: reqParam.movieId, userId: reqParam.userId, status: ACTIVE_STATUS });
            if (!userMovieExist) return responseHelper.successapi(res, res.__('userMovieDoesNotExists'), META_STATUS_0, SUCCESS);

            if (req.file) {
                let oldImagePath = path.join(__dirname, `../../../public/uploads/movie/${userMovieExist.image}`);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
                const response = await movieModel.findOneAndUpdate({ _id: reqParam.movieId }, {
                    $set: {
                        title: reqParam.title,
                        year: reqParam.year,
                        userId: reqParam.userId,
                        image: req.file.filename,
                        status: 1,
                    }
                });
            }
            const response = await movieModel.findOneAndUpdate({ _id: reqParam.movieId }, {
                $set: {
                    title: reqParam.title,
                    year: reqParam.year,
                    userId: reqParam.userId,
                }
            });
            return responseHelper.successapi(res, res.__('movieUpdatedSuccess'), META_STATUS_1, SUCCESS, response);
        } else {
            let validationMessage = await movieValidation.addmovieValidation(reqParam);
            if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);
            let data = {
                title: reqParam.title,
                year: reqParam.year,
                userId: reqParam.userId,
                image: req.file.filename,
                status: 1,
            }
            console.log(data, 'data')
            let response = await movieModel.create(data);
            // console.log(response, 'response')
            return responseHelper.successapi(res, res.__('movieaddedSuccess'), META_STATUS_1, SUCCESS, response);
        }

    } catch (error) {
        console.log(`Error from catch: ${error}`, error)
        return responseHelper.error(res, res.__('SomethingWentWrongPleaseTryAgain'), SERVERERROR);
    }
}