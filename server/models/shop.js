const mongoose = require('mongoose');
const joi = require('joi');


const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 225,
    },
    shopBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 4000,
    },
     
    creationDate: {
        type: Date,
        default: Date.now()
    }

});


const Shop = mongoose.model('Shop', shopSchema);

function validateShop(shop) {
    const schema = joi.object()
        .keys({
            shopName: joi.string()
                .required()
                .min(4)
                .max(225)
                .alphanum(),
            shopBody: joi.string()
                .required()
                .min(4)
                .max(4000),   
        });
    return joi.validate(shop, schema);
}

module.exports.Shop = Shop;
module.exports.validate = validateShop;