const Customers = require('../models/customers')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index');


const addCustomer = async (req,res)=>{
    const {phoneNumber}= req.body
    if(!phoneNumber){
        throw new BadRequestError("please provide the phoneNumber")
    }
    const exists = await Customers.findOne({phoneNumber})
    if(exists){
        throw new BadRequestError("phoneNumber already exists")
    }
    const customers = await Customers.create({...req.body})
    res.status(StatusCodes.CREATED).json({msg : customers})
}

const getAllCustomers = async (req,res)=>{
    const customers = await Customers.find({})
    res.status(StatusCodes.OK).json({msg : customers, count: customers.length})
}

const deleteCustomer = async (req,res)=>{
    const {phoneNumber} = req.body
    if(!phoneNumber){
        throw new BadRequestError("please provide the phoneNumber")
    }
    phoneNumber.forEach(async (numbers)=>{
        // const exists = await Customers.findOne({phoneNumber:numbers})
        // if(!exists && index == phoneNumber.length-1 ){
        //     throw new BadRequestError(`There is no customer with this phoneNumber , please correct it and send again from were the invalid number starts`)
        // }
        await Customers.findOneAndDelete({phoneNumber: numbers})
    })
    res.status(StatusCodes.CREATED).json({msg :"Customer has been deleted"})
}


module.exports={ getAllCustomers, addCustomer , deleteCustomer }