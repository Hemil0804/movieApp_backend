const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const helper = require('../../helpers/Helper')

module.exports = {
    async loginUserValidation(req) {
        const schema = Joi.object({
            email: Joi.string().required().email().min(2).max(30),
            password: Joi.string().required().min(4).max(30)
        }).unknown(true)
        const {error} = schema.validate(req)
        if (error) {
            return helper.validationMessageKey('validation', error)
        }
        return null
    },
}
