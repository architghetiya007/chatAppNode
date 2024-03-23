const express = require('express')
const userRouter = express.Router()
const userController = require('./controller')

const Login = [
    userController.login,
]
userRouter.post('/login', Login)

const Register = [
    userController.register,
]
userRouter.post('/register', Register)

const saveMessage = [
    userController.saveMessage,
]
userRouter.post('/save-message', saveMessage)

const GetMessage = [
    userController.getMessage,
]
userRouter.get('/get-message', GetMessage)

module.exports = userRouter
