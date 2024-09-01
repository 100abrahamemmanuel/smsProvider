single 

const AfricasTalking = require('africastalking');

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: 'atsk_dc71529f885a124070ff8a7091598d31043e1ee44117cb70aee01603fd1bbcc556e0ac3e', 
  username: 'sandbox'
});


module.exports = async function sendSMS() {
    
    // TODO: Send message
    try {
        const result=await africastalking.SMS.send({
            to: '+2348101892870', 
            message: 'Hey AT Ninja! Wassup...',
            from: '44565'
        });
        console.log(result);
    } catch(ex) {
    console.error(ex);
} 
};

bulk
const credentials = {
    apiKey: 'YOUR_API_KEY',         // use your sandbox app API key for development in the test environment
    username: 'YOUR_USERNAME',      // use 'sandbox' for development in the test environment
};
const AfricasTalking = require('africastalking')(credentials);

// Initialize a service e.g. SMS
const sms = AfricasTalking.SMS

// Use the service
const options = {
    to: ['+254711XXXYYY', '+254733YYYZZZ'],
    message: "I'm a lumberjack and its ok, I work all night and sleep all day",
    from: '44565' 
}

// Send message and capture the response or error
sms.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });