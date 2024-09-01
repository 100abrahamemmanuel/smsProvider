const {StatusCodes} = require('http-status-codes')

const credentials = {
    apiKey: process.env.SMS_API_KEY,         
    username: process.env.SMS_USERNAME,      
};
const AfricasTalking = require('africastalking')(credentials);

// Initialize a service e.g. SMS
const sms = AfricasTalking.SMS

const sendSingleSms = async (req,res)=>{
    const {reciever,information}= req.body
    if(!reciever){
        throw new BadRequestError("please provide the phoneNumber of the reciever")
    }
    try {
        const options = {
            to: reciever,
            message: information,
            from: '44565'
        }
        const result = await sms.send(options)
        return res.status(StatusCodes.OK).json({msg:result})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error})
    }

}

const sendBulkSms = async (req,res)=>{
    const {recievers,information}= req.body
    if(!recievers){
        throw new BadRequestError("please provide the phoneNumbers of the recievers")
    }
    try {
        const options = {
            to: recievers,
            message: information,
            from: '44565'
        }
        const result = await sms.send(options)
        return res.status(StatusCodes.OK).json({msg:result})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error})
    }

    
}


module.exports={ sendSingleSms, sendBulkSms }