require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const {StatusCodes} = require('http-status-codes')
 
//extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')




// connectDB 
const connectDB = require('./db/connect')

//Router
const customersRouter = require('./routes/customers')
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

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
