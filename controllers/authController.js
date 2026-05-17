const { signupSchema, signinSchema } = require("../middleware/validator");
const jwt = require("jsonwebtoken");
const { dohash, dohashValidation } = require("../utils/hashing");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
      const { email, password } = req.body;
      try {
        const {error, value} = signupSchema.validate({email, password});
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(401).json({ success: false, message: 'User already exists' });
        }

          const hashedPassword = await dohash(password, 12);

          const newUser = new User({ 
            email,
            password: hashedPassword
          });
          const result = await newUser.save();
          result.password = undefined;
          res.status(201).json({ success: true, message: 'Your account has been created successfully', data: result });

      } catch (error) {
        console.log(error);
      }
}


exports.signin = async (req, res) => {
   const { email, password } = req.body;
    try {
      const {error, value} = signinSchema.validate({email, password});
      if (error) {
          return res.status(400).json({ success: false, message: error.details[0].message });
      }
      const existingUser = await User.findOne({email}).select('+password');

      if (!existingUser) {
          return res.status(401).json({ success: false, message: 'user does not exist' });
      }
      const result = dohashValidation(password, existingUser.password);

      if (!result) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const token = jwt.sign({ 
        id: existingUser._id,
        email: existingUser.email,
        verifed: existingUser.verified
      }, process.env.TOKEN_SECRET);

      res.cookie('authorization', `Bearer ${token}`, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(200).json({
        success: true,
        token,
        message: 'logged in successfully'
      });

    } catch (error) {
      console.log(error);
    }
}


