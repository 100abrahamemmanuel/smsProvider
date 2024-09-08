require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const {StatusCodes} = require('http-status-codes')
const tls =require('tls')

 
//extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')




// connectDB 
const connectDB = require('./db/connect')

//Router
const customersRouter = require('./routes/customers')
const walletRouter = require('./routes/wallet')
const smsRouter = require('./routes/sendSms')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra packages
app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs:15*60*1000,// i5 minutes
  max:100,// limit each ip to 100 request per windowMs(15mins)
}))

app.use(express.json());
app.use(cors())
app.use(helmet())

app.use(xss())

// simple route  
app.get('/',(req,res)=>{
  res.status(StatusCodes.OK).json({msg:"Welcome to aour api, smsProvider is happy to helpsend messages fast and seamlessly"})
})

// routes 
app.use('/api/v1/customers', customersRouter)
app.use('/api/v1/sms',smsRouter)
app.use('/api/v1/wallet',walletRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const serverConfig =[
  {
      port: process.env.PORT || 5000
  },
  {
      port: process.env.PORT || 3001
  },
  {
      port:process.env.PORT || 3002
  },
  {
      port:process.env.PORT || 3003
  },
  {
      port:process.env.PORT || 3004
  },
  {
      port:process.env.PORT || 3005
  },
  {
      port:process.env.PORT || 3006
  }
]

const start = async () => {
  try {

    // Verify SSL/TLS 
    // const socket = tls.connect(443, '(termii.com)', () => {
    //   console.log(`SSL/TLS version: ${socket.getProtocol()}`);
    //   socket.destroy(); // Close the connection after verification
    // }).on('error', (err) => {
    //   console.error(err);
    //   process.exit(1); // Exit with error if verification fails
    // });


    await connectDB(process.env.MONGO_URI)
    // serverConfig.forEach((server)=>{
    //   app.listen(server.port, () =>
    //     console.log(`Server is listening on port ${server.port}...`)
    //   );
    // })

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error); 
  }
};

start();
