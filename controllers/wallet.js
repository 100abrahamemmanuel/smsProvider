const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index');
const axios = require('axios');



const getWalletBalance = async (req,res)=>{
    try {
        const response  = await axios.get("https://v3.api.termii.com/api/get-balance?api_key=TLjfNznpKvwxHvOMJsvGjbRmCUboXkSArjQQknKPbrIwVbyGkbqBImPepWEoqc")
        res.status(StatusCodes.OK).json({msg:response.data})
    } catch (error) {
        throw new BadRequestError(error)
    }
}
const fundWallet = async (req,res)=>{
    try {
    } catch (error) {
        throw new BadRequestError(error)
    }
}


module.exports={ getWalletBalance , fundWallet }