const moongoose = require("mongoose");
const { time } = require("node:console");
const { type } = require("node:os");

const userSchema = moongoose.Schema({
    email: {
        type: String,   
        required: [true, 'email is required'],
        trim: true,
        unique: ["true, 'email must be unique"],
    },
    password:{
        type: String,
        required: [true, 'password is required'],
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationcode: {
        type: String,
        select: false,
    },
     verificationcodevalidation: {
        type: Number,
        select: false,
    },
    forgotpasswordcode: {
        type: String,
        select: false,
    },
      forgotpasswordcodevalidation: {
        type: Number,
        select: false,
    },

}, {timestamps: true});

module.exports = moongoose.model('User', userSchema);