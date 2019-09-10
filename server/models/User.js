const mongoose = require('mongoose');
const joi = require('joi');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const jwt=require('jsonwebtoken');
const config=require('config');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 225,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 225,
        validate: {
            validator: email => validator.isEmail(email),
            message: 'please enter valid email'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 225,
        validate: {
            validator: phone => validator.isMobilePhone(phone),
            message: 'please enter valid phone number'
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 1024,
    },
    role: {
        type: String,
        enum:['admin','shopAdmin','customer'],
        default:'customer',
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }

});

userSchema.plugin(uniqueValidator,{ message: 'Email and UserName should be unique' });

userSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id ,role :this.role,email:this.email},config.get('jwtprivatekey'));
    return token;
}


const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = joi.object()
        .keys({
            userName: joi.string()
                .required()
                .min(4)
                .max(225)
                .alphanum(),
            email:joi.string()
                 .required()
                 .min(3)
                 .max(225)
                 .email({minDomainAtoms:2}),
            phoneNumber:joi.string()
                 .required()
                 .length(11)
                 .regex(/^([0-9]*)$/),
            password:joi.string()
                 .required()
                 .regex(/^([a-z0-9A-Z]*)$/),
            role:joi.string().only(['admin','shopAdmin','customer']),      
        });
    return joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;