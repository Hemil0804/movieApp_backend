require("dotenv").config({path:"../.env"});
console.log(process.env.DB_AUTH_URL,'DB_AUTH_URL')
module.exports = {
    PORT: 4000,
    APP_URL: process.env.APP_URL,
    JWT_AUTH_TOKEN_SECRET: process.env.JWT_AUTH_TOKEN_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    DB_AUTH_URL: process.env.DB_AUTH_URL,
    RESET_TOKEN_EXPIRES:process.env.RESET_TOKEN_EXPIRES,
    ADMIN: 2,
    USER: 1,
    PAGINATION_LIMIT: 10,
    SERVERERROR: 500,
    FAILURE: 400,
    UNAUTHORIZED: 401,
    SUCCESS: 200,
    MAINTANANCE: 503,
    ACTIVE_STATUS: 1,
    INACTIVE_STATUS: 2,
    DELETED_STATUS: 3,
    UNVERIFIED_STATUS: 4,
    META_STATUS_0: 0,
    META_STATUS_1: 1,
}