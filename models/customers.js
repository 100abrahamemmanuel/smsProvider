const mongoose = require('mongoose')
const validator = require('validator');

const customersSchema = mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:50,
    },
    phoneNumber:{
        type:String,
        required:[true,'please provide a phoneNumber'],
        validate:{
            validator:function(value){
                return validator.isMobilePhone(value,'any')
            },
            message:'Please provide valid PhoneNumber'
        },
    }
})

module.exports = mongoose.model('customers',customersSchema)