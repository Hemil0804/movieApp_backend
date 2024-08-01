const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const helper = require('../../helpers/Helper')

module.exports = {
    async addmovieValidation(req) {
        const schema = Joi.object({
            title: Joi.string().required().min(2).max(30),
            year: Joi.number().required(),
            status: Joi.number().optional().allow(1, 2)
        }).unknown(true)
        const {error} = schema.validate(req)
        if (error) {
            return helper.validationMessageKey('validation', error)
        }
        return null
    },
    async editmovieValidation(req) {
        const schema = Joi.object({
            title: Joi.string().required().min(2).max(30),
            year: Joi.number().required(),
            status: Joi.number().optional().allow(1, 2)
        }).unknown(true)
        const {error} = schema.validate(req)
        if (error) {
            return helper.validationMessageKey('validation', error)
        }
        return null
    },
}
