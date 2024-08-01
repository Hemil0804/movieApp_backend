
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const responseHelper = require('../helpers/responseHelper');
const userAuthValidation = require('../services/validation/apiUserValidation');
const { userAuthService } = require('../services/userAuth/userAuth.service');
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
    OTP_TIMEOUT } = require("../../config/key")
const userDetailTransformer = require('../transformers/user/userDetailTransformer')
const moment = require('moment');
const jwtTokenModel = require('../models/jwtToken.model');
exports.login = async (req, res) => {
    try {
        let reqParam = req.body;

        let validationMessage = await userAuthValidation.loginUserValidation(reqParam);
        if (validationMessage) return responseHelper.error(res, res.__(validationMessage), FAILURE);

        let foundUser = await userModel.findOne({ email: reqParam.email.toLowerCase(), status: { $ne: DELETED_STATUS } });
        // console.log(reqParam,'reqParam')
        // console.log(foundUser,'foundUser')
        // return false
        if (!foundUser) return responseHelper.successapi(res, res.__('emailOrPasswordIsWrong'), META_STATUS_0, SUCCESS);
        if (foundUser.status == INACTIVE_STATUS) {
            return responseHelper.successapi(res, res.__('yourAccountDisabled'), META_STATUS_0, SUCCESS);
        }

        if (bcrypt.compareSync(reqParam.password, foundUser.password)) {
            // console.log('if')
            // return false
            let tokenObject = {
                _id: foundUser._id,
                email: foundUser.email,
                status: foundUser.status
            }

            let tokenData = await jwt.sign({ tokenObject }, JWT_AUTH_TOKEN_SECRET, { expiresIn: '24h' });
            let checkDeviceToken = await jwtTokenModel.aggregate([
                {
                    $match: {
                        userId: foundUser._id,
                        token: tokenData
                    }
                }
            ])
            if (checkDeviceToken.length == 0) {
                if (tokenData) {
                    await jwtTokenModel.create({
                        userId: foundUser._id,
                        token: tokenData,
                        userType: 1
                    })
                }
            }

            let userService = await userAuthService({ userId: foundUser._id });
            console.log(foundUser._id,'foundUser._id')
            let userData = await userDetailTransformer.transformUserDetails(userService[0]);
            return responseHelper.successapi(res, res.__('userLoggedInSuccessfully'), META_STATUS_1, SUCCESS, userData, { tokenData: tokenData});
            
            // let isEmailVerified = foundUser.isEmailVerified ? foundUser.isEmailVerified : false;
            // if (isEmailVerified === false) {
            //     let otp = await Helper.otpFunction2();
            //     const expirationTime = moment().add(20, "minutes").toDate();
            //     await userModel.findOneAndUpdate({ email: foundUser.email.toLowerCase(), status: { $in: [ACTIVE_STATUS, UNVERIFIED_STATUS] } }, { $set: { otp, expirationTime } }, { new: true });
            //     return responseHelper.successapi(res, res.__('emailVerfied'), META_STATUS_1, SUCCESS, userData, { tokenData: tokenData });
            // } else {
            // }


        } else {
            // console.log('else')
            // return false
            return responseHelper.successapi(res, res.__('emailOrPasswordIsWrong'), META_STATUS_0, SUCCESS);
        }

    } catch (e) {
        console.log(`Error from catch: ${e}`, e)
        // logger.logger.error(`Error from catch: ${e}`);
        return responseHelper.error(res, res.__('SomethingWentWrongPleaseTryAgain'), SERVERERROR);
    }
}