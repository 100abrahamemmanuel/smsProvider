const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index');
var request = require('request');


 
const sendSingleSms = async (req,res)=>{
    const {reciever,information}= req.body
    if(!reciever){
        throw new BadRequestError("please provide the phoneNumber of the reciever")
    }
        
    var data = {
        "to":`${reciever}`,
        "from":"Oga Emma",
        "sms":`${information}`, 
        "type":"plain",
        "api_key":process.env.SMS_API_KEY,
        "channel":"generic", 
    }; 
    
    var options = {
        'method': 'POST',
        'url': 'https://v3.api.termii.com/api/sms/send',
        'headers': {
            'Accept': 'application/json, text/plain,*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    };
    request(options, function (error, response) { 
    if (error) throw new Error(error);
       let body = response.body
        return res.status(StatusCodes.OK).json({msg:body}) 
    });
  
}

const sendBulkSms = async (req,res)=>{
    const {recievers,information}= req.body
    if(!recievers){
        throw new BadRequestError("please provide the phoneNumbers of the recievers")
    }
    
    var data = {
        "to":recievers,
        "from":"Oga Emma",
        "sms":`${information}`, 
        "type":"plain",
        "api_key":process.env.SMS_API_KEY,
        "channel":"generic", 
    }; 
     
    var options = {
        'method': 'POST',
        'url': 'https://v3.api.termii.com/api/sms/send/bulk',
        'headers': {
            'Accept': 'application/json, text/plain,*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    };
    request(options, function (error, response) { 
    if (error) throw new Error(error);
        let body = response.body
         res.status(StatusCodes.OK).json({msg:body}) 
    });

    
}


module.exports={ sendSingleSms, sendBulkSms }
