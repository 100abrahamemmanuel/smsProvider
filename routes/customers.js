const express = require('express')
const { getAllCustomers, addCustomer , deleteCustomer } = require('../controllers/customers')
const router = express.Router()


router.get('/all', getAllCustomers)
router.post('/add', addCustomer)
router.delete('/delete', deleteCustomer)

module.exports=router