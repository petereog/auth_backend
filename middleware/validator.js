const joi = require('joi');

exports.signupSchema = joi.object({
    email: joi.string().min(6).max(50)
    .email({
           tlds: { allow: ['com', 'net', 'org'] },
    }).required(),
    password: joi.string().min(8).max(50).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,50}$')),
})

exports.signinSchema = joi.object({
    email: joi.string().min(6).max(50)
    .email({
           tlds: { allow: ['com', 'net', 'org'] },
    }).required(),
    password: joi.string().min(8).max(50).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,50}$')),
})