const express = require('express')
const { getWalletBalance , fundWallet } = require('../controllers/wallet')

const router = express.Router()

router.route('/').get(getWalletBalance)
router.route('/topup').get(fundWallet)

module.exports=router