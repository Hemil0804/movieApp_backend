const jwt = require("jsonwebtoken");
const responseHelper = require("../helpers/responseHelper");
const { UNAUTHORIZED, SERVERERROR, ACTIVE_STATUS, DELETED_STATUS, ADMIN, USER,JWT_AUTH_TOKEN_SECRET } = require("../../config/key");
const UserModel = require("../models/user.model");
const jwtTokenModel = require("../models/jwtToken.model");

exports.verifyAuthToken = async (req, res, next) => {
    try {
        let userDetails;

        if (!req.header("Authorization")) return responseHelper.error(res, res.__("TokenNotFound"), UNAUTHORIZED);
        const token = req.header("Authorization").replace("Bearer ", "");

        let checkToken = await jwtTokenModel.findOne({ token: token, userType: { $in: [ADMIN, USER] } });
        if (!checkToken) return responseHelper.error(res, res.__("InvalidToken"), UNAUTHORIZED);

        const decoded = await jwt.verify(token, JWT_AUTH_TOKEN_SECRET);
        if (!decoded) return responseHelper.error(res, res.__("TokenExpired"), UNAUTHORIZED);

        else userDetails = await UserModel.findOne({
            _id: decoded.tokenObject._id,
            status: { $ne: DELETED_STATUS },
        })
        if (userDetails === null || userDetails === undefined) return responseHelper.error(res, res.__("TokenExpired"), UNAUTHORIZED);

        if (userDetails.status === ACTIVE_STATUS) {
            req.user = userDetails;
            req.token = token;

            next();
        } else {
            return responseHelper.error(res, res.__("UnauthorizedContent"), UNAUTHORIZED);
        }
    } catch (e) {
        if (e.message === 'jwt malformed') return responseHelper.error(res, res.__('UnauthorizedContent'), UNAUTHORIZED, e);

        return responseHelper.error(res, res.__('TokenExpired'), UNAUTHORIZED, e);
    }
};


exports.verifyResetToken = (req, res, next) => {
    const resetToken = req.params.token;
    if (!resetToken) {
        return responseHelper.error(res, res.__("InvalidToken"), UNAUTHORIZED);
    } else {
        jwt.verify(resetToken, JWT_AUTH_TOKEN_SECRET, async (err, decoded) => {
            if (decoded) {
                const foundUser = await UserModel.findOne({
                    _id: decoded._id,
                    resetToken: resetToken,
                });
                if (foundUser === null || foundUser === undefined) {
                    return responseHelper.error(res, res.__("TokenExpired"), UNAUTHORIZED);
                }

                if (foundUser.status === ACTIVE_STATUS) {
                    req.user = foundUser;
                    req.token = resetToken;
                    next();
                } else {
                    return responseHelper.error(res, res.__("UnauthorizedContent"), UNAUTHORIZED);
                }
            } else {
                return responseHelper.error(res, res.__("TokenExpired"), UNAUTHORIZED);
            }
        });
    }
};