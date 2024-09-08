const express = require('express')
const { sendSingleSms, sendBulkSms } = require('../controllers/sendSms')

const router = express.Router()

router.route('/single').post(sendSingleSms)
router.route('/bulk').post(sendBulkSms)

module.exports=router 